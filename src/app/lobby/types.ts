import { InjectionToken } from '@angular/core';

export interface IProfile {
  nickname: string;
  picture: string;
}

export interface IPlayer {
  id: string;
  color: string;
  profile: IProfile;
}

export interface IMinimalState {
  currentTurn: string;
  players: IPlayer[];
}
export interface IRoom<T extends IMinimalState = IMinimalState> {
  id: string;
  sessionId: string;
  name: string;
  state: T;

  send(message: any): void;
  leave(): void;
}

export const ROOM_TOKEN = new InjectionToken<IRoom>('ROOM');
