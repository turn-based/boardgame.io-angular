import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardBase, BoardConfig, OBSERVABLE_BOARD_CONFIG } from 'boardgame.io-angular';
import { Observable } from 'rxjs';

@Component({
  template: `
    <div style="text-align: left;" [style.opacity]="playerID == ctx.currentPlayer ? 1 : 0.5">
      <h3>Player {{playerID}}</h3>
      <pre>{{G | json}}</pre>
      <button (click)="moves.A()">A</button>
      <button (click)="moves.B()">B</button>
      <button (click)="undo()">undo</button>
      <button (click)="redo()">redo</button>
      <button (click)="events.endTurn()">end turn</button>
    </div>
  `,
})
class BoardComponent extends BoardBase {
  constructor(@Inject(OBSERVABLE_BOARD_CONFIG) observableBoardConfig: Observable<BoardConfig>) {
    super(observableBoardConfig);
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
