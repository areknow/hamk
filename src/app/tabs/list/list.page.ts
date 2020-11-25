import { Component } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CupertinoPane } from 'cupertino-pane';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  currentImage: any;
  public cupertinoPane: CupertinoPane;

  constructor() // private camera: Camera
  {}

  takePicture() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // };

    // this.camera.getPicture(options).then(
    //   imageData => {
    //     this.currentImage = 'data:image/jpeg;base64,' + imageData;
    //   },
    //   err => {
    //     // Handle error
    //     console.log('Camera issue:' + err);
    //   }
    // );
    let settings = {};
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', settings);
    this.cupertinoPane.present({ animate: true });
  }
}
