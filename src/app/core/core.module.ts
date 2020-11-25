import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [TabsComponent, AuthComponent],
  imports: [CommonModule, RouterModule],
  exports: [TabsComponent]
})
export class CoreModule {}
