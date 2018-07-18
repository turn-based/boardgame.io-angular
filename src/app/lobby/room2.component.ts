import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUp } from './fade-in-up.animation';
import { IRoom, ROOM_TOKEN } from './types';
import { ColyseusService } from './colyseus.service';

@Component({
  animations: [
    fadeInUp,
  ],
  template: `
    <div fxLayout fxFlexFill fxLayoutAlign="center center">
      <mat-drawer-container @fadeInUp
                            *ngIf="room" class="mat-elevation-z4"
                            style="border: 3px solid #fa4f4f; min-width: 920px; min-height: 486px; height: 80%; width: 80%;">
        <mat-drawer style="border-left: 1px solid #fa4f4f; min-width: 220px;" mode="side" position="end" opened
                    fxLayout="column"
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
                <p matLine *ngIf="!isDone()" [ngSwitch]="player.id === room.state.currentTurn" class="player-status">
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
        <mat-drawer-content fxLayout fxLayoutAlign="center center"
                            style="
                              background-color: white;
                              box-shadow:
                                inset 0 0 4px 1px rgba(0,0,0,.2),
                                inset 0 0 5px 2px rgba(0,0,0,.14),
                                inset 0 0 10px 1px rgba(0,0,0,.12);
                              ">
          <ng-container [ngSwitch]="room.state.currentTurn == null">
            <div *ngSwitchCase="false" style="height: 400px; width: 600px;">
              <div *ngIf="isDone()"
                   style="position: absolute; height: 100%; width: 100%; top: 0; left: 0; color: white; background: rgba(0,0,0,0.8);"
                   fxLayout fxLayoutAlign="center center">
                <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="16px">
                  <div>
                    <ng-container *ngIf="room.state.winner">
                      <strong>Winner: </strong>{{getWinnerNickName()}}!
                    </ng-container>
                    <ng-container *ngIf="room.state.draw">
                      Draw!
                    </ng-container>
                  </div>
                  <button mat-stroked-button color="accent" (click)="playAgain()">Play Again</button>
                </div>
              </div>
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
    private colyseus: ColyseusService,
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { room: { room: IRoom, BoardComponent: any } }) => {
        if (this.room) {
          this.room.leave();
        }
        this.updateRoom(data.room);
      });
  }

  updateRoom({room, BoardComponent}: { room: IRoom, BoardComponent: any }) {
    this.room = room; // reusing the room resolver for now todo move board somewhere else

    this.roomInjector = Injector.create({providers: [{provide: ROOM_TOKEN, useValue: this.room}], parent: this.injector});
    this.BoardComponent = BoardComponent;
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

  isDone() {
    return this.room.state.winner || this.room.state.draw;
  }

  getWinnerNickName() {
    const winner = this.room.state.players.find(player => player.id === this.room.state.winner);
    return winner.profile.nickname;
  }

  playAgain() {
    this.room.onLeave.addOnce(async () => {
      const room = await this.colyseus.joinWhenReady(this.room.name);
      delete this.room;

      this.router.navigate(['..', room.id], {relativeTo: this.route});
    });
    this.room.leave();
  }
}
