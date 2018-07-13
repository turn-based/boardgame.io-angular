import { Component } from '@angular/core';
import { ColyseusService } from './colyseus.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="mat-elevation-z2" style="background: white; padding: 24px;">
      readyState {{colyseus.readyState}}
      
      <button mat-stroked-button (click)="play()" [disabled]="!colyseus.isReady">play</button>
    </div>
  `,
  styles: [`
    :host {
      background: #005661;
      display: block;
      box-sizing: border-box;
      height: 100vh;
      width: 100vw;
      padding: 16px;
    }
  `]
})
export class TestComponent {

  constructor(public colyseus: ColyseusService, private router: Router) {
  }

  play() {
    this.colyseus.joinWhenReady('tic-tac-toe').then(room => {
      this.router.navigate(['/rooms', room.id]);
    });
  }

}
