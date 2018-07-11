import { Component } from '@angular/core';
import { ColyseusService } from './colyseus.service';
import { Router } from '@angular/router';

@Component({
  template: `
    readyState {{colyseus.readyState}}

    <button (click)="play()" [disabled]="!colyseus.isReady">play</button>
  `,
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
