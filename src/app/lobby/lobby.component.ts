import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_ORIGIN } from '../site-config';
import { ColyseusWrapperService, Room } from './colyseus-wrapper.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { from, Observable, Subject, timer } from 'rxjs';
import { DataChange } from 'colyseus.js';
import { RoomAvailable } from 'colyseus.js/lib/Room';
import { Router } from '@angular/router';

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

      <div class="mat-elevation-z6" style="border: 4px dashed #d3abce; width: 320px;">
        <div fxLayout fxLayoutAlign="space-between center" style="padding: 16px 24px;">
          <h3>Tic-Tac-Toe</h3>
          <button mat-stroked-button color="primary">Start New</button>
        </div>
        <mat-divider></mat-divider>
        <div *ngIf="availableRooms$ | async as availableRooms" style="padding: 16px 24px;">
          <ng-container [ngSwitch]="availableRooms.length === 0">
            <h4 *ngSwitchCase="true">There are currently no open sessions</h4>
            <ng-container *ngSwitchCase="false">
              <h4>Open sessions</h4>
              <div  fxLayout="column" fxLayoutGap="1.33em">
                <div *ngFor="let room of availableRooms" fxLayout fxLayoutAlign="space-between center">
                  <span>seats: {{room.clients}} / {{room.maxClients}}</span>
                  <a mat-stroked-button [routerLink]="'../rooms/' + room.roomId">Join</a>
                </div>
              </div>
            </ng-container>
          </ng-container>
          <!--<mat-list dense>-->
          <!--<mat-list-item *ngFor="let room of availableRooms">-->
          <!--<h4 matLine>seats: {{room.clients}} / {{room.maxClients}}</h4>-->
          <!--<p matLine> id: {{room.roomId}} </p>-->
          <!--<a mat-stroked-button [routerLink]="'../rooms/' + room.roomId">Join</a>-->
          <!--</mat-list-item>-->
          <!--</mat-list>-->
        </div>
      </div>
    </div>

  `,
  viewProviders: [
    {
      provide: Room,
      useFactory(colyseusWrapper: ColyseusWrapperService) {
        return colyseusWrapper.join('chat');
      },
      deps: [ColyseusWrapperService]
    }
  ],
})
export class LobbyComponent implements OnDestroy {
  availableRooms$: Observable<RoomAvailable[]>;
  message: any;
  private _destroy = new Subject();

  // roomsTypes$: Observable<any>;

  constructor(public auth: AuthService,
              private http: HttpClient,
              private room: Room,
              colyseus: ColyseusWrapperService,
              public router: Router) {
    room.messages$.pipe(takeUntil(this._destroy)).subscribe((message) => {
      console.log('wow', message, typeof message);
    });
    //
    room.stateChanges$.pipe(takeUntil(this._destroy)).subscribe((state) => {
      console.log('wow2', state, typeof state);
    });

    room.listen('myTest/status').pipe(takeUntil(this._destroy)).subscribe((change: DataChange) => {
      console.log('xxx ', change);
    });

    room.send({message: 'testing'});

    this.availableRooms$ = timer(0, 5000).pipe(switchMap(() => from(colyseus.getAvailableRooms(room.name))));

    // this.roomsTypes$ = timer(0, 5000).pipe(switchMap(() => colyseus.getRoomList()));

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

  join(roomId: string) {
    console.log('joining ' + roomId);
    this.router.navigate(['../rooms', roomId]);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.room.ngOnDestroy(); // todo remove this if issue solved (angular should be able to destroy viewProviders)
    console.log('component onDestroy');
  }
}
