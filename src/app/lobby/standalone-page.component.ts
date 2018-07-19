import { Component } from '@angular/core';
import { TicTacToeBoard2Component } from '../boards/tic-tac-toe-board2.component';

@Component({
  template: `
    <tb-room [room]="room" [BoardComponent]="BoardComponent" (playAgain)="playAgain()" (leave)="leave()"></tb-room>
  `,
})
export class StandalonePageComponent {
  room = {};
  BoardComponent = TicTacToeBoard2Component;
  playAgain() {}
  leave() {}
}
