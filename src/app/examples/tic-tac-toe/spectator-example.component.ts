import { Component } from '@angular/core';
import { TicTacToeBoardComponent } from '../../boards/tic-tac-toe-board.component';
import { SERVER_ORIGIN } from '../../site-config';
import { TicTacToe } from '../../../../shared/games/tic-tac-toe';

@Component({
  template: `
    <div fxLayout fxLayoutGap="32px">
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 0</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_ORIGIN}"
                    gameID="spectator"
                    playerID="0"></bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 1</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_ORIGIN}"
                    gameID="spectator"
                    playerID="1"></bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>Spectator</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_ORIGIN}"
                    gameID="spectator"></bio-client>
      </div>
    </div>
  `
})
export class SpectatorExampleComponent {
  SERVER_ORIGIN = SERVER_ORIGIN;

  TicTacToe = TicTacToe;
  TicTacToeBoardComponent = TicTacToeBoardComponent;
}
