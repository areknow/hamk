import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent {
  @Input() image: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() rating: number;
  @Input() position: { lat: number; lng: number };
  @Input() id: number;

  @Output() more = new EventEmitter<void>();

  constructor(public actionSheetController: ActionSheetController) {}

  async handleMoreClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Directions',
          handler: () => {
            window.location.href = `maps:?q=${this.position.lat}, ${this.position.lng}`;
          }
        },
        {
          text: 'Favorite',
          handler: () => {}
        },
        {
          text: 'Share',
          handler: async () => {
            await Share.share({
              title: this.title,
              text: 'Check out this sweet spot!',
              url: 'https://hamk.life/listing/1231231'
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }
}
