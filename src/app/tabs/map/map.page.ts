import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { ACCESSIBILITY_GROUP, RESULT_GROUP } from './button-groups';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Plugins } from '@capacitor/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Listing } from 'src/app/shared/models/listing';
import { MapCardComponent } from 'src/app/shared/components/map-card/map-card.component';
import { MapCardService } from './map-card.service';
import { Router } from '@angular/router';
import { CupertinoPane } from 'cupertino-pane';
import { CUPERTINO_PANEL_SETTINGS } from './cupertino-settings';
import { TabsService } from 'src/app/core/tabs/tabs.service';
const { Keyboard, Geolocation } = Plugins;

interface IButtonGroup {
  active: boolean;
  value: number;
  label: string;
}

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) mapInfoWindow: MapInfoWindow;
  @ViewChild('mapCardsContainer', { static: false }) mapCardsContainer: ElementRef;
  @ViewChild('cupertinoPane', { static: false }) cupertinoPaneElement: ElementRef;
  @ViewChildren(MapCardComponent, { read: ElementRef }) mapCards: QueryList<ElementRef>;

  searchValue = '';
  sheetOpen = false;

  resultGroup = RESULT_GROUP;
  accessibilityGroup = ACCESSIBILITY_GROUP;

  defaultPosition = {
    lat: 37.839217,
    lng: -122.501133
  };

  mapLoaded = false;
  mapOptions: google.maps.MapOptions = {
    center: this.defaultPosition,
    zoom: 8,
    disableDefaultUI: true
  };
  mapInfoContent: string;

  cupertinoPane: CupertinoPane;
  cupertinoSettings = CUPERTINO_PANEL_SETTINGS;
  showCupertinoBackdrop = false;

  activeListing = undefined;

  get listings(): Listing[] {
    return this.fireStoreService.listings;
  }

  constructor(private fireStoreService: FirestoreService, private router: Router, private tabService: TabsService) {
    this.fireStoreService.observer.subscribe(() => {
      this.trackScrollView();
    });
  }

  async ionViewDidEnter() {
    await this.getLocation();
    await this.loadMap();
  }

  ngAfterViewInit() {
    this.cupertinoPane = new CupertinoPane(this.cupertinoPaneElement.nativeElement, this.cupertinoSettings);
  }

  // scrollMapCardIntoView(id) {
  //   console.log(id);
  //   console.log(document.getElementById(id));
  //   setTimeout(() => {
  //     const element = document.getElementById(id);
  //     element.scrollIntoView();
  //   }, 1000);
  // }

  async loadMap() {
    const loader = new Loader({
      apiKey: environment.mapsApiKey,
      version: 'weekly'
    });
    await loader.load();
    this.mapLoaded = true;
  }

  async getLocation() {
    try {
      const {
        coords: { latitude, longitude }
      } = await Geolocation.getCurrentPosition();
      this.defaultPosition = {
        lat: latitude,
        lng: longitude
      };
    } catch (error) {
      console.log(error);
    }
  }

  trackScrollView() {
    const options = {
      root: this.mapCardsContainer.nativeElement,
      rootMargin: '20px',
      threshold: 1
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.intersectionRatio === 1) {
          this.router.navigate([], {
            queryParams: {
              listing: entry.target.id
            },
            queryParamsHandling: 'merge'
          });
        }
      }
    };
    const observer = new IntersectionObserver(callback, options);
    for (const element of Array.from(this.mapCards)) {
      observer.observe(element.nativeElement);
    }
  }

  submit() {
    Keyboard.hide();
  }

  toggleTuneSheet() {
    this.sheetOpen = !this.sheetOpen;
  }

  handleResultButtonGroup(event: number) {
    this.toggleButtonGroupStates(this.resultGroup, event);
  }

  handleAccessibilityButtonGroup(event: number) {
    this.toggleButtonGroupStates(this.accessibilityGroup, event);
  }

  handleMapCardClick(listing: Listing) {
    this.activeListing = listing;
    this.tabService.tabBarVisibility = false;
    this.showCupertinoBackdrop = true;
    this.cupertinoPane.present({ animate: true });
  }

  handleListingPanelBackClick() {
    this.cupertinoPane.hide();
    this.showCupertinoBackdrop = false;
    this.tabService.tabBarVisibility = true;
  }

  toggleButtonGroupStates(group: IButtonGroup[], event: number) {
    for (const button of group) {
      button.active = button.value === event;
    }
  }

  centerMap() {
    this.map.panTo(this.defaultPosition);
  }

  openInfo(marker: MapMarker, listing: Listing) {
    this.mapInfoContent = listing.title;
    this.mapInfoWindow.open(marker);
  }
}
