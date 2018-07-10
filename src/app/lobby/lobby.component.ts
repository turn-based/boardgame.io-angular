import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_ORIGIN } from '../site-config';

@Component({
  template: `
    <div style="padding: 16px" fxLayout="column" fxLayoutGap="16px">
      <div [ngSwitch]="auth.isAuthenticated()">
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

      <button mat-raised-button (click)="authorizedPing()">authorized ping</button>
      <mat-card *ngIf="message">{{ message | json}}</mat-card>
    </div>

  `
})
export class LobbyComponent {
  message: any;

  constructor(public auth: AuthService, private http: HttpClient) {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  authorizedPing() {
    this.http.get(`${SERVER_ORIGIN}/api-authorized/ping`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = data,
        error => this.message = error
      );
  }
}
