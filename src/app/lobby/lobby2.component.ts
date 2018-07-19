import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUp } from './fade-in-up.animation';
import { ColyseusService } from './colyseus.service';

@Component({
  animations: [
    fadeInUp
  ],
  template: `
    <section fxLayout fxFlexFill fxLayoutAlign="center center">
      <div style="min-height: 80%">
        <div fxLayout="column" fxLayoutAlign="start center" class="mat-elevation-z8"
             style="background-color: white; border: 4px dashed #fa4f4f; padding: 16px 32px 38px 32px;" @fadeInUp>
          <h4>Checkout Our games</h4>
          <div fxLayout fxLayoutAlign="space-between center">
            <span style="">Tic Tac Toe</span>
            <span fxFlex="26px"></span>
            <button mat-stroked-button (click)="play()" [disabled]="!colyseus.isReady">
              {{colyseus.isReady ? 'Play' : "Sorry, can't play while server is down"}}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Lobby2Component {
  constructor(private router: Router, private route: ActivatedRoute, public colyseus: ColyseusService) {
  }

  async play() {
    const room = await this.colyseus.joinWhenReady('base-room');

    this.router.navigate(['../rooms', room.id], {relativeTo: this.route});
  }
}
