import { Component } from '@angular/core';
import { TicTacToe } from './game';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';
import { ai } from './ai';

@Component({
  template: `
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
      <strong>Single Player</strong>
      <bio-client [game]="TicTacToe"
                  [board]="TicTacToeBoardComponent"
                  [ai]="ai"
                  gameID="gameID"></bio-client>
    </div>
  `
})
export class SinglePlayerExampleComponent {
  TicTacToe = TicTacToe;
  TicTacToeBoardComponent = TicTacToeBoardComponent;
  ai = ai;
}
