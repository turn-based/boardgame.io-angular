import { Component } from '@angular/core';
import { ColyseusService } from './colyseus.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Auth0UserProfile } from 'auth0-js';

@Component({
  template: `
    <div class="mat-elevation-z8" style="background: white;">
      <mat-toolbar gdColumns="1fr auto 1fr" color="primary">
        <ng-container [ngSwitch]="auth.isAuthenticated()">
          <ng-container *ngSwitchCase="false">
            <span>Hello stranger!</span>
            <button mat-raised-button (click)="login()" color="accent">Login for more fun</button>
          </ng-container>
          <ng-container *ngSwitchCase="true">
            <span [ngSwitch]="!!profile" fxLayout fxLayoutAlign="start center" fxLayoutGap="8px">
              <ng-container *ngSwitchCase="true">
                <img [src]="profile?.picture" height="32px" width="32px" style="border-radius: 50%; border: 2px solid white;">
                <span>Hello {{profile?.nickname}}!</span>
                <button mat-stroked-button (click)="logout()">Logout</button>
              </ng-container>
              <ng-container *ngSwitchCase="false">Loading profile...</ng-container>
            </span>
            <span></span>
          </ng-container>
        </ng-container>
        <div fxLayout fxLayoutAlign="end">
          <small>Game server is "<code>{{colyseus.readyState}}</code>"</small>
        </div>
      </mat-toolbar>
      <section style="padding: 24px;" fxLayout fxLayoutAlign="center">
        <div fxLayout="column" fxLayoutAlign="start center" class="mat-elevation-z8"
             style="border: 4px dashed #d3abce; padding: 16px 32px 38px 32px;">
          <h4>Checkout Our games</h4>
          <div fxLayout fxLayoutAlign="space-between center">
            <span style="">Tic Tac Toe</span>
            <span fxFlex="26px"></span>
            <button mat-stroked-button (click)="play()" [disabled]="!colyseus.isReady" [ngSwitch]="colyseus.isReady">
              <ng-container *ngSwitchCase="true">play</ng-container>
              <ng-container *ngSwitchCase="false">Sorry, can't play while server is down</ng-container>
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      background: #005661;
      display: block;
      box-sizing: border-box;
      height: 100vh;
      width: 100vw;
      padding: 36px;
    }
  `]
})
export class LobbyComponent {
  profile: Auth0UserProfile;

  constructor(public auth: AuthService, public colyseus: ColyseusService, private router: Router) {
    if (auth.isAuthenticated()) {

      auth.scheduleRenewal(); // todo move this somewhere higher

      this.auth.getProfile().then((profile) => {
        this.profile = profile;
      });
    }
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  play() {
    this.colyseus.joinWhenReady('tic-tac-toe', {
      accessToken: localStorage.getItem('access_token')
    }).then(room => {
      this.router.navigate(['/rooms', room.id]);
    });
  }

}
