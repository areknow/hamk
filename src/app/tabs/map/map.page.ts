import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { ACCESSIBILITY_GROUP, RESULT_GROUP } from './button-groups';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Plugins } from '@capacitor/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Listing } from 'src/app/shared/models/listing';
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
export class MapPage {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) mapInfoWindow: MapInfoWindow;

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

  get listings(): Listing[] {
    return this.fireStoreService.listings;
  }

  constructor(private fireStoreService: FirestoreService) {}

  async ionViewDidEnter() {
    await this.getLocation();
    await this.loadMap();
  }

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
