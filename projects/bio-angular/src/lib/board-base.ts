import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardConfig, OBSERVABLE_BOARD_CONFIG } from './config';

@Injectable()
export class BoardBase {
  isMultiplayer: boolean;
  isConnected: boolean;
  isPreview: boolean;
  playerID = '1';
  isActive = true;
  ctx: any;
  G: any;
  moves: any;
  log: any;

  undo: any;
  redo: any;
  events: any;

  constructor(@Inject(OBSERVABLE_BOARD_CONFIG) private observableBoardConfig: Observable<BoardConfig>) {
    this.observableBoardConfig.subscribe((config) => {
      if (config) {
        Object.assign(this, config);
      }
    });
  }
}
