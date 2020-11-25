import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent, ButtonGroupItemDirective } from './button-group.component';

@NgModule({
  declarations: [ButtonGroupComponent, ButtonGroupItemDirective],
  imports: [CommonModule],
  exports: [ButtonGroupComponent, ButtonGroupItemDirective]
})
export class ButtonGroupModule {}
