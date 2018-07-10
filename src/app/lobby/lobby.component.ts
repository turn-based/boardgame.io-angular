import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div style="padding: 16px" [ngSwitch]="auth.isAuthenticated()">
      <button *ngSwitchCase="false" mat-raised-button (click)="login()">login</button>

      <ng-container *ngSwitchCase="true">
        <ng-container *ngIf="(auth.getProfile() | async) as profile">
          <mat-card style="width: 280px;">
            <mat-card-title-group>
              <mat-card-title>{{ profile.nickname }}</mat-card-title>
              <mat-card-subtitle>{{ profile.email }}</mat-card-subtitle>
              <img mat-card-md-image [src]="profile.picture">
            </mat-card-title-group>
            <mat-card-actions>
              <button mat-raised-button (click)="logout()">logout</button>
            </mat-card-actions>
          </mat-card>
        </ng-container>
      </ng-container>
    </div>

  `
})
export class LobbyComponent {
  constructor(public auth: AuthService) {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}
