import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ColyseusService } from './colyseus.service';
import { Room } from 'colyseus.js';
import { TicTacToe } from '../../../shared/games/tic-tac-toe';

// getBoardInputs() {
//   const state = this.client.getState();
//   return {
//     ...state,
//     isMultiplayer: this.multiplayer !== undefined,
//     moves: this.client.moves,
//     events: this.client.events,
//     gameID: this.gameID,
//     playerID: this.playerID,
//     reset: this.client.reset,
//     undo: this.client.undo,
//     redo: this.client.redo,
//   };
@Component({
  template: `
    <h3>roomId = {{room.id}}</h3>

    <tb-tic-tac-toe-board *ngIf="room?.state?.bgio?.G"
                          [G]="room.state.bgio.G"
                          [ctx]="room.state.bgio.ctx"
                          playerID="0"
                          [isActive]="isActive('0')"
                          [moves]="movesP0"
    >
    </tb-tic-tac-toe-board>

    <tb-tic-tac-toe-board *ngIf="room?.state?.bgio?.G"
                          [G]="room.state.bgio.G"
                          [ctx]="room.state.bgio.ctx"
                          playerID="1"
                          [isActive]="isActive('1')"
                          [moves]="movesP1"
    ></tb-tic-tac-toe-board>


    <div>{{room.state | json }}</div>
  `,
})
export class RoomComponent implements OnDestroy {
  room: Room;

  movesP0: { clickCell: any };
  movesP1: { clickCell: any };

  constructor(route: ActivatedRoute, router: Router, colyseus: ColyseusService) {
    this.room = colyseus.getConnectedRoom(route.snapshot.paramMap.get('roomId'));

    if (this.room == null) {
      router.navigate(['test']);
    }

    this.movesP0 = {
      clickCell: RoomComponent.prototype.action.bind(this, '0'),
    };
    this.movesP1 = {
      clickCell: RoomComponent.prototype.action.bind(this, '1'),
    };
  }

  action(playerID: string, cell: number) {
    this.room.send({
      action:
        {
          type: 'MAKE_MOVE', payload: {type: 'clickCell', args: [cell], playerID}
        }
    });
  }

  isActive(playerID: string) {
    return this.room.state.bgio.ctx.gameover === undefined && TicTacToe.flow.canPlayerMakeMove(
      this.room.state.bgio.G,
      this.room.state.bgio.ctx,
      playerID
    );
  }

  ngOnDestroy() {
    this.room.leave();
  }
}
