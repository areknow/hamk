import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Listing } from 'src/app/shared/models/listing';
import { ActionSheetController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-listing-gallery',
  templateUrl: './listing-gallery.component.html',
  styleUrls: ['./listing-gallery.component.scss']
})
export class ListingGalleryComponent implements OnInit {
  @Output() back = new EventEmitter<void>();

  @Input() listing: Listing;

  constructor(public actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  async handleMore() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Directions',
          handler: () => {
            window.location.href = `maps:?q=${this.listing.position.lat}, ${this.listing.position.lng}`;
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
              title: this.listing.title,
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
