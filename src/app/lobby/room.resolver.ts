import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ColyseusService } from './colyseus.service';
import { TicTacToeBoardComponent } from '../boards/tic-tac-toe-board.component';
import { TicTacToeBoard2Component } from '../boards/tic-tac-toe-board2.component';
import { IRoom } from './types';

@Injectable()
export class RoomResolver implements Resolve<{room: IRoom, BoardComponent: any}> {

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
      return {room, BoardComponent: TicTacToeBoard2Component};
      // return {
      //   raw: room,
      //   name: 'Tic Tac Toe',
      //   state: RoomStatus.WAITING_FOR_PLAYERS,
      //   id: route.paramMap.get('roomId'),
      //   players: [
      //     {
      //       profile: {
      //         nickname: 'itsME',
      //         picture: 'https://api.adorable.io/avatars/162/itsME@adorable.png',
      //       },
      //       color: 'rgb(102,127,203)',
      //       isCurrent: false,
      //       isMe: false,
      //     },
      //     {
      //       profile: {
      //         nickname: 'JohnJohn',
      //         picture: 'https://api.adorable.io/avatars/162/John@adorable.png',
      //       },
      //       color: 'rgb(234, 123, 123)',
      //       isCurrent: false,
      //       isMe: true,
      //     },
      //     {
      //       profile: {
      //         nickname: 'Nancy',
      //         picture: 'https://api.adorable.io/avatars/162/Nancy@adorable.png',
      //       },
      //       color: 'rgb(235,224,74)',
      //       isCurrent: false,
      //       isMe: true,
      //     },
      //     {
      //       profile: {
      //         nickname: 'abott',
      //         picture: 'https://api.adorable.io/avatars/162/abott@adorable.png',
      //       },
      //       color: 'rgb(0,213,69)',
      //       isCurrent: true,
      //       isMe: true,
      //     },
      //   ]
      // };
    }
  }
}
