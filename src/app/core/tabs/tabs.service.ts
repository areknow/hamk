import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private tabBarVisible = true;

  set tabBarVisibility(value: boolean) {
    this.tabBarVisible = value;
  }

  get tabBarVisibility(): boolean {
    return this.tabBarVisible;
  }

  constructor() {}
}
