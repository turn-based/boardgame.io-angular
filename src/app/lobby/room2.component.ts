import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { fadeInUp } from './fade-in-up.animation';
import { IRoom, ROOM_TOKEN } from './types';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'tb-room',
  animations: [
    fadeInUp,
    trigger('fadeIn', [
      transition(':enter', useAnimation(fadeIn, {params: {timing: '0.5'}}))
    ])
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
                [ngClass]="{'shadow-pop-tr': canPlayerMakeMove(player.idx)}"
              >
                <img matListAvatar [src]="player.profile.picture" style="border: 2px solid;" [ngStyle]="{'border-color': player.color}">
                <h3 matLine>
                  {{player.profile.nickname}}
                </h3>
                <p matLine [ngSwitch]="isDone()" class="player-status">
                  <span *ngSwitchCase="true" class="current-player">
                    {{player.idx === room.state.bgio.ctx.gameover.winner ?
                              (player.id === room.sessionId ? 'You Won!' : 'Winner') : '&nbsp;'}}
                  </span>
                  <ng-container *ngSwitchCase="false" [ngSwitch]="canPlayerMakeMove(player.idx)">
                    <span *ngSwitchCase="false" style="color: #c3c3c3">Waiting...</span>
                    <ng-container *ngSwitchCase="true" [ngSwitch]="player.id === room.sessionId">
                      <span *ngSwitchCase="false" class="current-player">Current Player</span>
                      <span *ngSwitchCase="true" class="your-turn">Your Turn</span>
                    </ng-container>
                  </ng-container>
                </p>
              </mat-list-item>
            </mat-list>
          </div>
          <div fxLayout="column" fxLayoutGap="8px" style="margin: 12px">
            <button mat-stroked-button (click)="notImplemented()">View History</button>
            <button mat-stroked-button (click)="leave.emit()">Leave</button>
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
              <div *ngIf="isDone()" @fadeIn
                   style="position: absolute; height: 100%; width: 100%; top: 0; left: 0; color: white; background: rgba(0,0,0,0.8);"
                   fxLayout fxLayoutAlign="center center">
                <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="16px">
                  <div>
                    <ng-container *ngIf="room.state.bgio.ctx.gameover.winner">
                      <strong>Winner: </strong>{{getWinnerNickName()}}!
                    </ng-container>
                    <ng-container *ngIf="room.state.bgio.ctx.gameover.draw">
                      Draw!
                    </ng-container>
                  </div>
                  <button mat-raised-button color="accent" (click)="playAgain.emit()">Play Again</button>
                </div>
              </div>
              <ng-container *ngComponentOutlet="BoardComponent; injector: injectorWithRoom;"></ng-container>
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
export class Room2Component {
  @Input() BoardComponent: any;
  @Input() Game: any;

  injectorWithRoom: Injector;

  private _room: IRoom;
  get room() {
    return this._room;
  }

  @Input() set room(room: IRoom) {
    if (room != null) {
      this._room = room;

      this.injectorWithRoom = Injector.create({providers: [{provide: ROOM_TOKEN, useValue: this._room}], parent: this.injector});
    }
  }

  @Output() playAgain = new EventEmitter<never>();
  @Output() leave = new EventEmitter<never>();

  constructor(private injector: Injector) {
  }

  notImplemented() {
    console.warn('not implemented');
  }

  isDone() {
    return this.room.state.bgio.ctx.gameover !== undefined;
  }

  getWinnerNickName() {
    const winner = this.room.state.players.find(player => player.idx === this.room.state.bgio.ctx.gameover.winner);
    return winner.profile.nickname;
  }

  canPlayerMakeMove(playerID: string) {
    return this.Game.flow.canPlayerMakeMove(this.room.state.bgio.G, this.room.state.bgio.ctx, playerID);
  }
}
