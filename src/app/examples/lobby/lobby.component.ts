import { Component, OnInit } from '@angular/core';
import { LobbyService } from './lobby.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME_TYPES } from './game-types';

@Component({
  template: `
    <h4>Select Game Type</h4>
    <table>
      <tr *ngFor="let gameType of (gameTypes | async)">
        <td>{{gameType}}</td>
        <td [ngSwitch]="supportedGameTypes.includes(gameType)" style="text-align: right; padding-left: 20px;">
          <button *ngSwitchCase="true" mat-button (click)="startGame(gameType)">Start</button>
          <strong *ngSwitchCase="false">not supported</strong>
        </td>
      </tr>
    </table>
  `
})
export class LobbyComponent implements OnInit {
  gameTypes: Promise<string[]>;
  supportedGameTypes: string[];

  constructor(private lobby: LobbyService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.gameTypes = this.lobby.getGameTypes();
    this.supportedGameTypes = Object.keys(GAME_TYPES);
  }

  async startGame(gameType: string) {
    const {gameID} = await this.lobby.createGame(gameType);
    this.router.navigate(['games', gameType, 'rooms', gameID], {relativeTo: this.route});
  }
}
