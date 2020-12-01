import { Component, OnDestroy, OnInit } from '@angular/core';
import { CupertinoPane } from 'cupertino-pane';
import { TabsService } from 'src/app/core/tabs/tabs.service';

import { ActionSheetController } from '@ionic/angular';
// import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy {
  public cupertinoPane: CupertinoPane;

  id: string;

  constructor(
    private tabsService: TabsService,
    public actionSheetController: ActionSheetController,
    // private launchNavigator: LaunchNavigator,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.tabsService.tabBarVisibility = false;
    const settings = {
      bottomClose: false,
      buttonClose: false,
      breaks: {
        top: {
          enabled: true,
          height: window.screen.height - 80,
          bounce: true
        },
        bottom: {
          enabled: true,
          height: 165,
          bounce: true
        },
        middle: {
          enabled: true,
          height: window.screen.height - 270,
          bounce: true
        }
      }
    };
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', settings);
    this.cupertinoPane.present({ animate: true });
  }

  async handleMoreButton() {
    // const actionSheet = await this.actionSheetController.create({
    //   buttons: [
    //     {
    //       text: 'Directions',
    //       handler: () => {
    //         this.launchNavigator.navigate([1, 2], { app: this.launchNavigator.APP.APPLE_MAPS });
    //       }
    //     },
    //     {
    //       text: 'Favorite',
    //       handler: () => {}
    //     },
    //     {
    //       text: 'Share',
    //       handler: () => {
    //         if (navigator.share) {
    //           navigator
    //             .share({
    //               title: 'fake title',
    //               text: 'Check out this sweet spot!',
    //               url: 'https://hamk.io/spot/1231231'
    //             })
    //             .then(() => console.log('Successful share'))
    //             .catch(error => console.log('Error sharing', error));
    //         }
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {}
    //     }
    //   ]
    // });
    // await actionSheet.present();
  }

  ngOnDestroy() {
    this.tabsService.tabBarVisibility = true;
  }
}
