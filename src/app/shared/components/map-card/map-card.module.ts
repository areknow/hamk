import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCardComponent } from './map-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MapCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [MapCardComponent]
})
export class MapCardModule {}
