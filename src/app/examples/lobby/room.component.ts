import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LobbyService } from './lobby.service';
import { GAME_TYPES } from './game-types';
import { SERVER_HOST } from '../../site-config';

@Component({
  template: `
    <div><strong>gameType</strong> = {{gameType}}</div>
    <div><strong>roomId</strong> = {{roomId}}</div>
    <br>
    <hr>

    <ng-container [ngSwitch]="joined">
      <div *ngSwitchCase="false" fxLayout="column">
        <h3>Select Player</h3>
        <div fxLayout fxLayoutGap="16px">
          <button *ngFor="let idx of [0, 1, 2, 3]" mat-raised-button (click)="joinAs(idx)">{{idx}}</button>
          <button mat-raised-button (click)="spectate()">spectator</button>
        </div>
      </div>
      <div *ngSwitchCase="true">
        <h4>(open in a <a target="_blank" rel="noopener noreferrer" [href]="href">new Tab</a> to join as another user)</h4>
        <bio-client [game]="game"
                    [board]="board"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_HOST}"
                    [gameID]="roomId"
                    [playerID]="playerId"
                    [credentials]="credentials">
        </bio-client>
      </div>
    </ng-container>
  `,
})
export class RoomComponent implements OnInit {
  SERVER_HOSTNAME = SERVER_HOST;

  game: any;
  board: any;

  roomId: string;
  gameType: string;
  playerId: string;
  credentials: string;
  joined = false;
  href: string;

  constructor(private lobby: LobbyService, private route: ActivatedRoute) {
    this.href = window.location.href;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.gameType = paramMap.get('gameType');
      const {game, board} = GAME_TYPES[this.gameType];
      this.game = game;
      this.board = board;

      this.roomId = paramMap.get('roomId');
    });
  }

  async joinAs(playerId) {
    const {playerCredentials} = await this.lobby.joinGame(this.gameType, this.roomId, {
      playerID: playerId,
      playerName: playerId.toString()
    });

    this.playerId = playerId.toString();
    this.credentials = playerCredentials;

    this.joined = true;
  }

  spectate() {
    this.joined = true;
  }
}
