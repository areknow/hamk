import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  },
  {
    path: 'listing/:id',
    component: ListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPageRoutingModule {}
