/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BoardConfig, OBSERVABLE_BOARD_CONFIG } from 'boardgame.io-angular';

function IsVictory(cells: any) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (const i of pos) {
      // tslint:disable-next-line:triple-equals
      if (cells[i] != symbol) {
        winner = null;
        break;
      }
    }
    if (winner != null) {
      return true;
    }
  }

  return false;
}

const game = {
  name: 'tic-tac-toe',

  setup: () => ({
    cells: new Array(9).fill(null),
  }),

  moves: {
    clickCell(G: any, ctx: any, id: any) {
      const cells = [...G.cells];

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
        return {...G, cells};
      }
    },
  },

  turn: {
    moveLimit: 1,
  },

  endIf: (G: any, ctx: any): any => {
    if (IsVictory(G.cells)) {
      return {winner: ctx.currentPlayer};
    }
    if (G.cells.filter((c: any) => c === null).length === 0) {
      return {draw: true};
    }
  },
};

@Component({
  styleUrls: ['./tic-tac-toe.css'],
  template: `
      <div>
          <table id="board" *ngIf="G">
              <tbody>
              <tr *ngFor="let i of [0, 1, 2]">
                  <ng-container *ngFor="let j of [0, 1, 2]">
                      <ng-container *ngIf="{id: 3 * i + j}; let stupidAngular">
                          <td [class.active]="isActive && G.cells[stupidAngular.id] === null"
                              (click)="onClick(stupidAngular.id)">
                              {{G.cells[stupidAngular.id]}}
                          </td>
                      </ng-container>
                  </ng-container>
              </tr>
              </tbody>
          </table>
          <div *ngIf="!isPreview && playerID" id="player">Player: {{playerID}}</div>
          <ng-container *ngIf="ctx && ctx.gameover">
              <div *ngIf="ctx.gameover.winner !== undefined; else draw" id="winner">Winner: {{ctx.gameover.winner}}</div>
              <ng-template #draw>
                  <div id="winner">Draw!</div>
              </ng-template>
          </ng-container>
          <div *ngIf="!isPreview && isMultiplayer && !isConnected">Disconnected!</div>
      </div>
  `,
})
class BoardComponent {
  isMultiplayer: boolean;
  isConnected: boolean;
  isPreview: boolean;
  playerID = 1;
  isActive = true;
  ctx: any;
  G: any;
  moves: any;

  constructor(@Inject(OBSERVABLE_BOARD_CONFIG) observableBoardConfig: Observable<BoardConfig>) {
    observableBoardConfig.subscribe((config) => {
      if (config) {
        Object.assign(this, config);
      }
    });
  }

  onClick(id: number) {
    if (this.isActive && this.G.cells[id] === null) {
      this.moves.clickCell(id);
    }
  }
}

@NgModule({
  declarations: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class StupidUselessNeededModule {
}

export { game, BoardComponent };
