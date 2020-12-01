import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-routing.module';
import { ButtonGroupModule } from '../../shared/components/button-group/button-group.module';
import { MapCardModule } from 'src/app/shared/components/map-card/map-card.module';
import { ListingComponent } from './listing/listing.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MapPageRoutingModule,
    ButtonGroupModule,
    MapCardModule,
    GoogleMapsModule
  ],
  declarations: [MapPage, ListingComponent]
})
export class MapPageModule {}
