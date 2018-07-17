import { IRoom, RoomState } from './room2.component';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

// 'rgb(102,127,203)', //'rgb(100, 100, 193)',
//   'rgb(234, 123, 123)',
//   'rgb(235,224,74)',
//   'rgb(0,213,69)'

@Injectable()
export class RoomResolver implements Resolve<IRoom> {

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return {
      name: 'Tic Tac Toe',
      state: RoomState.WAITING_FOR_PLAYERS,
      id: route.paramMap.get('roomId'),
      players: [
        {
          profile: {
            nickname: 'itsME',
            picture: 'https://api.adorable.io/avatars/162/itsME@adorable.png',
          },
          color: 'rgb(102,127,203)',
          isCurrent: false,
          isMe: false,
        },
        {
          profile: {
            nickname: 'JohnJohn',
            picture: 'https://api.adorable.io/avatars/162/John@adorable.png',
          },
          color: 'rgb(234, 123, 123)',
          isCurrent: false,
          isMe: true,
        },
        {
          profile: {
            nickname: 'Nancy',
            picture: 'https://api.adorable.io/avatars/162/Nancy@adorable.png',
          },
          color: 'rgb(235,224,74)',
          isCurrent: true,
          isMe: true,
        },
        {
          profile: {
            nickname: 'abott',
            picture: 'https://api.adorable.io/avatars/162/abott@adorable.png',
          },
          color: 'rgb(0,213,69)',
          isCurrent: false,
          isMe: false,
        },
      ]
    };
  }
}
