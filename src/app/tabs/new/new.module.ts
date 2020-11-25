import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewPage } from './new.page';
import { NewPageRoutingModule } from './new-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, NewPageRoutingModule],
  declarations: [NewPage]
})
export class NewPageModule {}
