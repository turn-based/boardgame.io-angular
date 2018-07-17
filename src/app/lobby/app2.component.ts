import { Component } from '@angular/core';

@Component({
  template: `
    <div fxLayout="column" style="height: 100%;">
      <mat-toolbar class="mat-elevation-z6" style="z-index: 1">ROOMS!</mat-toolbar>
      <div fxFlex style="position: relative; overflow: hidden;">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class App2Component {

}
