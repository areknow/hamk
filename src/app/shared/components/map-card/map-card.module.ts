import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCardComponent } from './map-card.component';
import { RouterModule } from '@angular/router';
import { RatingModule } from '../rating/rating.module';

@NgModule({
  declarations: [MapCardComponent],
  imports: [CommonModule, RouterModule, RatingModule],
  exports: [MapCardComponent]
})
export class MapCardModule {}
