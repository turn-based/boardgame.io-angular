import { Component } from '@angular/core';

@Component({
  template: `
    <div fxLayout="column" style="height: 100%;">
      <mat-toolbar fxFlex="none" class="mat-elevation-z6" style="z-index: 1">
        <a mat-button routerLink="/app2/lobby">ROOMZ!</a>
      </mat-toolbar>
      <div fxFlex style="min-width: 100%; overflow-x: auto;
                    background-image: url('/assets/background.png'); background-size: cover;">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class App2Component {

}
