/// <reference types="googlemaps" />

import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { ACCESSIBILITY_GROUP, RESULT_GROUP } from './button-groups';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Plugins } from '@capacitor/core';
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
  @ViewChild('mapTarget', { static: false }) mapTarget: ElementRef;

  searchValue = '';
  sheetOpen = false;

  resultGroup = RESULT_GROUP;
  accessibilityGroup = ACCESSIBILITY_GROUP;

  defaultPosition = {
    lat: 37.839217,
    lng: -122.501133
  };

  mapObject: google.maps.Map;

  fakeCards = [
    {
      id: 1,
      image: 'https://picsum.photos/100/100',
      title: 'Ludington State Park Beach',
      subTitle: '8800 M-116, Ludington, MI 49431',
      rating: 3,
      geo: {
        lat: 44.03585,
        lng: -86.506272
      }
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/100/100',
      title: 'Ludington State Park Beach',
      subTitle: '8800 M-116, Ludington, MI 49431',
      rating: 1,
      geo: {
        lat: 44.03585,
        lng: -86.506272
      }
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/100/100',
      title: 'Ludington State Park Beach',
      subTitle: '8800 M-116, Ludington, MI 49431',
      rating: 1,
      geo: {
        lat: 44.03585,
        lng: -86.506272
      }
    }
  ];

  constructor(private fireStoreService: FirestoreService) {}

  ionViewDidEnter() {
    this.getLocation();
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
      this.loadMap();
    } catch (error) {
      console.log(error);
    }
  }

  async loadMap() {
    const loader = new Loader({
      apiKey: environment.mapsApiKey,
      version: 'weekly'
    });

    await loader.load();

    this.mapObject = new google.maps.Map(this.mapTarget.nativeElement, {
      center: this.defaultPosition,
      zoom: 8,
      disableDefaultUI: true
    });
  }

  submit() {
    Keyboard.hide();
  }

  toggleTuneSheet() {
    console.log(this.fireStoreService.getAll());
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
    this.mapObject.panTo(this.defaultPosition);
  }
}
