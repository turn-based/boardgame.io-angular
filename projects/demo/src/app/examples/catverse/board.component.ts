import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardBase, BoardConfig, OBSERVABLE_BOARD_CONFIG } from 'boardgame.io-angular';
import { Observable } from 'rxjs';

@Component({
  styleUrls: ['../../../../../../boardgame.io/examples/react-web/src/tic-tac-toe/board.css'],
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
class BoardComponent extends BoardBase {
  constructor(@Inject(OBSERVABLE_BOARD_CONFIG) observableBoardConfig: Observable<BoardConfig>) {
    super(observableBoardConfig);
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
  // issue tracked by https://github.com/angular/angular/issues/33507
}

export { BoardComponent };
