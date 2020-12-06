import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapCardService {
  private cardCurrentlyInView: string;

  get currentMapCard(): string {
    return this.cardCurrentlyInView;
  }
  set currentMapCard(value) {
    this.cardCurrentlyInView = value;
  }
}
