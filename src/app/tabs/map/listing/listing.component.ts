import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { TabsService } from 'src/app/core/tabs/tabs.service';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Listing } from 'src/app/shared/models/listing';
import { Plugins } from '@capacitor/core';
// import { CUPERTINO_PANEL_SETTINGS } from './cupertino-settings';
const { Share } = Plugins;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy, AfterViewInit {
  paneElem: ElementRef;
  @ViewChild('cupertinoPane', { static: false })
  set pane(pane: ElementRef) {
    this.paneElem = pane;
  }

  cupertinoPane: CupertinoPane;
  // cupertinoSettings = CUPERTINO_PANEL_SETTINGS;

  id: string;
  listing: Listing = undefined;

  constructor(
    private tabsService: TabsService,
    public actionSheetController: ActionSheetController,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.tabsService.tabBarVisibility = false;
    this.id = this.route.snapshot.params.id;
  }

  async ngOnInit() {
    await this.getListing();
  }

  ngAfterViewInit() {
    // this.cupertinoPane = new CupertinoPane(this.paneElem.nativeElement, this.cupertinoSettings);
    this.cupertinoPane.present({ animate: true });
  }

  async getListing() {
    try {
      this.listing = (await this.firestoreService.get(this.id)) as Listing;
    } catch (error) {
      console.log(error);
    }
  }

  async handleMoreButton() {
    console.log(this.listing);
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

  back() {
    this.cupertinoPane.destroy({ animate: true });
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.tabsService.tabBarVisibility = true;
  }
}
