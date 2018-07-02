import { Component } from '@angular/core';
import { TicTacToe } from './game';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';

@Component({
  template: `
    <div fxLayout fxLayoutGap="32px">
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 0</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: 'localhost:8000'}"
                    gameID="multi"
                    playerID="0"></bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 1</strong>
        <bio-client [game]="TicTacToe"
                    [board]="TicTacToeBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: 'localhost:8000'}"
                    gameID="multi"
                    playerID="1"></bio-client>
      </div>
    </div>
  `
})
export class MultiPlayerExampleComponent {
  TicTacToe = TicTacToe;
  TicTacToeBoardComponent = TicTacToeBoardComponent;
}
