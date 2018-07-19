import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ColyseusService } from './colyseus.service';
import { TicTacToeBoard2Component } from '../boards/tic-tac-toe-board2.component';
import { IRoom } from './types';
import { TicTacToe } from '../../../shared/games/tic-tac-toe';

@Injectable()
export class RoomResolver implements Resolve<{room: IRoom, BoardComponent: any, Game: any}> {

  constructor(private colyseus: ColyseusService, private router: Router) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const room = this.colyseus.getConnectedRoom(route.paramMap.get('roomId')) as any as IRoom;

    if (room == null) {
      this.router.navigate(['/app2/lobby']);
    } else {
      return {room, BoardComponent: TicTacToeBoard2Component, Game: TicTacToe};
    }
  }
}
