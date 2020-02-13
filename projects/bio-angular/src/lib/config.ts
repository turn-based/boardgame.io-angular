import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';

export interface GameConfig {
  game: any;
  numPlayers?: number;
  board: any;
  multiplayer?: any;
  ai?: any;
  enhancer?: any;
  debug?: any;
}

export interface BoardConfig {
  isMultiplayer: boolean;
  moves: any;
  events: any;
  gameID: any;
  playerID: any;
  step: any;
  reset: any;
  undo: any;
  redo: any;
  gameMetadata: any;

  [key: string]: any;
}

export const OBSERVABLE_BOARD_CONFIG = new InjectionToken<Observable<BoardConfig>>('BoardConfigObservable');

@Injectable()
export class GameScope {
  private configSubject = new BehaviorSubject<GameConfig | false>(false);
  configObservable = this.configSubject.asObservable();

  static fromConfig(config: GameConfig) {
    const scope = new GameScope();
    scope.setConfig(config);
    return scope;
  }

  setConfig(config: GameConfig | false) {
    this.configSubject.next(config);
  }
}
