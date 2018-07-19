import { Component, Inject } from '@angular/core';
import { IRoom, ROOM_TOKEN } from '../lobby/types';

export interface ITicTacToeMoves {
  clickCell(args: { x: number, y: number }): void;
}

export abstract class Board<T, U> {
  public moves: U;

  get G() {
    return this.room.state.bgio.G;
  }

  get isActive() {
    return this.room.state.bgio.ctx.gameover === undefined && this.room.sessionId === this.room.state.currentTurn;
    // todo user TicTacToe.flow.canPlayerMakeMove(this.room.state.bgio.G, this.room.state.bgio.ctx, playerID)
    //  (instead of this.room.sessionId === this.room.state.currentTurn)
  }

  constructor(
    @Inject(ROOM_TOKEN) public room: IRoom<T>
  ) {
    this.moves = new Proxy(Object.create(null), {
      get: (target, prop) => (args) => {
          this.room.send({action: {type: 'MAKE_MOVE', payload: {type: prop, args}}});
        }
    }) as U;
  }
}

@Component({
  template: `
    <div style="height: 100%; width: 100%;" fxLayout fxLayoutAlign="center center">
      <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="16px">
        <table class="tic-tac-toe-board">
          <tr *ngFor="let i of [0, 1, 2]">
            <ng-container *ngFor="let j of [0, 1, 2]">
              <td *ngxInit="3 * i + j as id" [ngClass]="{active: isCellActive(id)}" (click)="onClick(id)">{{G.cells[id]}}</td>
            </ng-container>
          </tr>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./tic-tac-toe-board.component.scss'],
})
export class TicTacToeBoard2Component extends Board<{ cells: number[] }, ITicTacToeMoves> {
  onClick(id) {
    if (this.isCellActive(id)) {
      this.moves.clickCell(id);
    }
  }

  isCellActive(id) {
    return this.isActive && this.G.cells[id] === null;
  }
}
