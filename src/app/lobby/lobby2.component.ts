import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <section fxLayout fxFlexFill fxLayoutAlign="center center">
      <div style="min-height: 80%">
        <div fxLayout="column" fxLayoutAlign="start center" class="mat-elevation-z8"
             style="background-color: white; border: 4px dashed #fa4f4f; padding: 16px 32px 38px 32px;">
          <h4>Checkout Our games</h4>
          <div fxLayout fxLayoutAlign="space-between center">
            <span style="">Tic Tac Toe</span>
            <span fxFlex="26px"></span>
            <!--colyseus.isReady-->
            <button mat-stroked-button (click)="play()" [disabled]="false" [ngSwitch]="true">
              <ng-container *ngSwitchCase="true">play</ng-container>
              <ng-container *ngSwitchCase="false">Sorry, can't play while server is down</ng-container>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Lobby2Component {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  play() {
    this.router.navigate(['../rooms', 'fdsf'], {relativeTo: this.route});
  }
}
