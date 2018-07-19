import { InjectionToken } from '@angular/core';
import { Signal } from '@gamestdio/signals';

export interface IProfile {
  nickname: string;
  picture: string;
}

export interface IPlayer {
  id: string;
  idx: string;
  color: string;
  profile: IProfile;
}

export interface IRoomState<T> {
  currentTurn: string;
  players: IPlayer[];
  winner: string;
  draw: boolean;

  bgio: {
    G: T,
    ctx: {
      gameover: any
    }
  };
}

export interface IRoom<T = any> {
  id: string;
  sessionId: string;
  name: string;
  state: IRoomState<T>;
  onLeave: Signal;

  send(message: any): void;
  leave(): void;
}

export const ROOM_TOKEN = new InjectionToken<IRoom>('ROOM');
