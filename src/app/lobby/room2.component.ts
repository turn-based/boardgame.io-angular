import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface IProfile {
  nickname: string;
  picture: string;
}

export interface IPlayer {
  color: string;
  isCurrent: boolean;
  isMe: boolean;
  profile: IProfile;
}

export enum RoomState {
  PLAYING,
  WAITING_FOR_PLAYERS,
}

export interface IRoom {
  id: string;
  name: string;
  players: IPlayer[];
  state: RoomState;
}

@Component({
  template: `
    <div fxLayout fxFlexFill fxLayoutAlign="center center">
      <mat-drawer-container *ngIf="room" class="mat-elevation-z4"
                            style="border: 3px solid #fa4f4f; min-width: 920px; height: 80%; width: 80%;">
        <mat-drawer style="border-left: 2px solid #fa4f4f; min-width: 220px;" mode="side" position="end" opened fxLayout="column"
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
          <div fxFlex style="margin: 0 6px;" fxLayout="column">
            <mat-list dense style="margin-bottom: 10px;">
              <h3 matSubheader>Players</h3>
              <mat-list-item
                *ngFor="let player of room.players"
                [ngClass]="{'mat-elevation-z1': player.isCurrent}"
              >
                <img matListAvatar [src]="player.profile.picture" style="border: 2px solid;" [ngStyle]="{'border-color': player.color}">
                <h3 matLine>
                  {{player.profile.nickname}}
                </h3>
                <p matLine [ngSwitch]="player.isCurrent" class="player-status">
                  <!-- else wait... -->
                  <span *ngSwitchCase="false" style="color: #c3c3c3">Waiting...</span>
                  <ng-container *ngSwitchCase="true" [ngSwitch]="player.isMe">
                    <span *ngSwitchCase="false" class="current-player">Current Player</span>
                    <span *ngSwitchCase="true" class="your-turn">Your Turn</span>
                  </ng-container>
                </p>
              </mat-list-item>
            </mat-list>
          </div>
          <div fxLayout="column" fxLayoutGap="8px" style="margin: 12px">
            <button mat-stroked-button (click)="notImplement()">View History</button>
            <button mat-stroked-button (click)="notImplement()">Leave</button>
          </div>
        </mat-drawer>
        <mat-drawer-content fxLayout fxLayoutAlign="center center" style="background-color: white;">
          <ng-container [ngSwitch]="room.state">
            <div *ngSwitchCase="RoomState.PLAYING" class="mat-elevation-z2" style="height: 400px; width: 600px;">
              Main content*ngIf="room" class="mat-elevation-z4" style="position: relative; min-width: 920px; height: 80%; width: 80%;"
            </div>
            <ng-container *ngSwitchCase="RoomState.WAITING_FOR_PLAYERS">
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
export class Room2Component implements OnInit {
  room: IRoom;
  RoomState = RoomState;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { room: IRoom }) => {
        this.room = data.room;
      });
  }

  notImplement() {
    console.warn('not implemented');
  }
}
