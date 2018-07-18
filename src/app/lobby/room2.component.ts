import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUp } from './fade-in-up.animation';
import { IRoom, ROOM_TOKEN } from './types';

@Component({
  animations: [
    fadeInUp,
  ],
  template: `
    <div fxLayout fxFlexFill fxLayoutAlign="center center">
      <mat-drawer-container @fadeInUp
                            *ngIf="room" class="mat-elevation-z4"
                            style="border: 3px solid #fa4f4f; min-width: 920px; min-height: 486px; height: 80%; width: 80%;">
        <mat-drawer class="mat-elevation-z2" style="min-width: 220px;" mode="side" position="end" opened fxLayout="column"
                    fxLayoutAlign="end">
          <div style="height: 100px; background-color: #fa4f4f; color: white; position: relative;" fxLayout="column" fxLayoutAlign="end">
            <button mat-icon-button [matMenuTriggerFor]="menu" style="position: absolute; top: 6px; right: 4px;">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu" xPosition="before">
              <button mat-menu-item>View On Github</button>
            </mat-menu>

            <h2 class="mat-headline" style="margin-left: 16px;">
              {{room.name}}
            </h2>
            <em>
              <small style="position: absolute; bottom: 48px; left: 14px;">Now playing...</small>
            </em>
          </div>
          <div fxFlex style="margin: 0 12px;" fxLayout="column">
            <mat-list dense style="margin-bottom: 10px;">
              <h3 matSubheader>Players</h3>
              <mat-list-item
                *ngFor="let player of room.state.players"
                [ngClass]="{'mat-elevation-z1': player.id === room.state.currentTurn}"
              >
                <img matListAvatar [src]="player.profile.picture" style="border: 2px solid;" [ngStyle]="{'border-color': player.color}">
                <h3 matLine>
                  {{player.profile.nickname}}
                </h3>
                <p matLine [ngSwitch]="player.id === room.state.currentTurn" class="player-status">
                  <!-- else wait... -->
                  <span *ngSwitchCase="false" style="color: #c3c3c3">Waiting...</span>
                  <ng-container *ngSwitchCase="true" [ngSwitch]="player.id === room.sessionId">
                    <span *ngSwitchCase="false" class="current-player">Current Player</span>
                    <span *ngSwitchCase="true" class="your-turn">Your Turn</span>
                  </ng-container>
                </p>
              </mat-list-item>
            </mat-list>
          </div>
          <div fxLayout="column" fxLayoutGap="8px" style="margin: 12px">
            <button mat-stroked-button (click)="notImplement()">View History</button>
            <button mat-stroked-button (click)="leave()">Leave</button>
          </div>
        </mat-drawer>
        <mat-drawer-content fxLayout fxLayoutAlign="center center" style="background-color: white;">
          <ng-container [ngSwitch]="room.state.currentTurn == null">
            <div *ngSwitchCase="false"  style="height: 400px; width: 600px;">
              <ng-container *ngComponentOutlet="BoardComponent; injector: roomInjector;"></ng-container>
            </div>
            <ng-container *ngSwitchCase="true">
              <strong style="color: rgb(250, 79, 79);">Waiting for players</strong>
              <div class="dot-wave">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </ng-container>
          </ng-container>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styleUrls: ['./room2.component.scss'],
})
export class Room2Component implements OnInit, OnDestroy {
  room: IRoom;
  BoardComponent: any;
  roomInjector: Injector;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
  ) {

  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { room: { room: IRoom, BoardComponent: any } }) => {
        if (this.room) {
          this.room.leave();
        }

        this.room = data.room.room; // reusing the room resolver for now todo move board somewhere else

        this.roomInjector = Injector.create({providers: [{provide: ROOM_TOKEN, useValue: this.room}], parent: this.injector});
        this.BoardComponent = data.room.BoardComponent;
      });
  }

  ngOnDestroy() {
    if (this.room) {
      this.room.leave();
    }
  }

  notImplement() {
    console.warn('not implemented');
  }

  leave() {
    this.router.navigate(['../../lobby'], {relativeTo: this.route});
  }
}
