import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardBase, BoardConfig, OBSERVABLE_BOARD_CONFIG } from 'boardgame.io-angular';
import { Observable } from 'rxjs';


@Component({
  styleUrls: ['../../../../../../boardgame.io/examples/react-web/src/redacted-move/board.css'],
  styles: [`
    .secret-state section {
      background: #555;
    }
  `],
  template: `
    <div class="secret-state">
      <section>
        <strong>G</strong>
        <pre>{{G | json}}</pre>

        <strong>log</strong>
        <pre>{{log | json}}</pre>

        <button [disabled]="playerID == null" (click)="moves.clickCell({ secret: G.players[ctx.currentPlayer] })">
          Click Cell
        </button>
      </section>
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
