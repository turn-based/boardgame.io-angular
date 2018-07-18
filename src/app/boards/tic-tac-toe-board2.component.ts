import { Component, Inject } from '@angular/core';
import { IMinimalState, IRoom, ROOM_TOKEN } from '../lobby/types';

@Component({
  template: `
    <div style="height: 100%; width: 100%;" fxLayout fxLayoutAlign="center center">
      <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="16px">
        <table class="tic-tac-toe-board">
          <tr *ngFor="let row of room.state.board; let x = index">
            <ng-container *ngFor="let cell of row; let y = index">
              <td [ngClass]="{active: isCellActive(cell)}" (click)="room.send({x: x, y: y})">{{cell === 0 ? '' : cell}}</td>
            </ng-container>
          </tr>
        </table>
        <div *ngIf="room.state.winner">
          <strong>Winner: </strong>{{getWinnerNickName()}}!
        </div>
        <div *ngIf="room.state.draw">
          Draw!
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./tic-tac-toe-board.component.scss'],
})
export class TicTacToeBoard2Component {
  constructor(@Inject(ROOM_TOKEN) public room: IRoom<IMinimalState & { board: number[][], winner: string, draw: boolean }>) {

  }

  isCellActive(cell) {
    return !this.room.state.winner &&  !this.room.state.draw && this.room.sessionId === this.room.state.currentTurn && cell === 0;
  }

  getWinnerNickName() {
    const winner = this.room.state.players.find(player => player.id === this.room.state.winner);
    return winner.profile.nickname;
  }
}
