import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'app-button-group-item',
  exportAs: 'appButtonGroupItem'
})
export class ButtonGroupItemDirective {
  @Input() value: string;

  @Output() event = new EventEmitter<ButtonGroupItemDirective>();

  @HostBinding('class')
  elementClass = 'button-group-item';

  @Input() active = false;

  @HostBinding('class.active') get activeClass() {
    return this.active;
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.event.emit(this);
  }
}

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonGroupComponent implements AfterContentInit, OnDestroy {
  @Output() buttonChange = new EventEmitter<string>();

  @ContentChildren(ButtonGroupItemDirective)
  items: QueryList<ButtonGroupItemDirective>;

  unsubscribe$ = new Subject();

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.event.pipe(takeUntil(this.unsubscribe$)).subscribe((clickedItem: ButtonGroupItemDirective) => {
        clickedItem.active = true;
        this.deactivateNonClickedItems(clickedItem);
        this.buttonChange.emit(clickedItem.value);
      });
    });
  }

  deactivateNonClickedItems(clickedItem: ButtonGroupItemDirective) {
    this.items.forEach(item => {
      if (item !== clickedItem) {
        item.active = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
