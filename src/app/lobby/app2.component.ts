import { Component } from '@angular/core';
import { ColyseusService, CONNECTION_STATUS } from './colyseus.service';

@Component({
  template: `
    <div fxLayout="column" style="height: 100%;">
      <mat-toolbar fxFlex="none" class="mat-elevation-z6" style="z-index: 1" fxLayout fxLayoutAlign="space-between center">
        <a mat-button routerLink="/app2/lobby">ROOMZ!</a>
        <mat-icon [title]="colyseus.readyState" style="color: #357cb2;">
          {{colyseus.readyState === CONNECTION_STATUS.CONNECTED ? 'cloud_done' : 'cloud_off'}}
        </mat-icon>
      </mat-toolbar>
      <div fxFlex style="min-width: 100%; overflow-x: auto;
                    background-image: url('/assets/background.png'); background-size: cover;">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class App2Component {
  CONNECTION_STATUS = CONNECTION_STATUS;

  constructor(public colyseus: ColyseusService) {}

}
