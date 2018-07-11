import { Component } from '@angular/core';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';
import { SERVER_HOST } from '../../site-config';
import { TicTacToe } from '../../../../shared/games/tic-tac-toe';

@Component({
  template: `
    <div fxLayout fxLayoutGap="32px">
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 0</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_HOST}"
                    gameID="multi"
                    playerID="0"></bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 1</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: SERVER_HOST}"
                    gameID="multi"
                    playerID="1"></bio-client>
      </div>
    </div>
  `
})
export class MultiPlayerExampleComponent {
  SERVER_HOSTNAME = SERVER_HOST;

  TicTacToe = TicTacToe;
  TicTacToeBoardComponent = TicTacToeBoardComponent;
}
