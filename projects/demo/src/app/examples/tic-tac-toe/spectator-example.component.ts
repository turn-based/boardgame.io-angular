import { Component } from '@angular/core';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';
import { SERVER_HOSTNAME } from '../../site-config';
import { TicTacToe } from '../../../../shared/games/tic-tac-toe';

@Component({
  template: `
    <div fxLayout fxLayoutGap="32px">
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 0</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_HOSTNAME}"
                    gameID="spectator"
                    playerID="0"></bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 1</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_HOSTNAME}"
                    gameID="spectator"
                    playerID="1"></bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>Spectator</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_HOSTNAME}"
                    gameID="spectator"></bio-client>
      </div>
    </div>
  `
})
export class SpectatorExampleComponent {
  SERVER_HOSTNAME = SERVER_HOSTNAME;

  TicTacToe = TicTacToe;
  TicTacToeBoardComponent = TicTacToeBoardComponent;
}
