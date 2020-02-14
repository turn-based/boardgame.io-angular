import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardBase, BoardConfig, OBSERVABLE_BOARD_CONFIG } from 'boardgame.io-angular';
import { Observable } from 'rxjs';

@Component({
  template: `
    <div>
      <pre>{{G | json}}</pre>
      <button (click)="moves.shuffle()">shuffle</button>
      <button (click)="moves.rollD6()">roll</button>
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
