import { Component } from '@angular/core';
@Component({
  selector: 'tb-root',
  template: '<router-outlet></router-outlet>',
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent {}
