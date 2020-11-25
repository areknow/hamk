import { Component, Directive, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-group-item',
  template: ` <a tabindex="1"><ng-content></ng-content></a> `,
  styles: [
    `
      a {
        flex: 1 1 0px;
        padding: 10px;
        border: 1px solid var(--hamk-primary-theme);
        color: black;
        text-align: center;
        font-size: 10px;
        cursor: pointer;
        &:first-child {
          border-right: 0;
          border-radius: 10px 0 0 10px;
        }
        &:last-child {
          border-left: 0;
          border-radius: 0 10px 10px 0;
        }
        &:focus,
        &:active {
          background: var(--hamk-primary-theme);
          outline: 0;
          color: white;
        }
      }
    `
  ]
})
export class ButtonGroupItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
