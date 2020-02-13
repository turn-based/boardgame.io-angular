import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule, GameScope } from 'boardgame.io-angular';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { Debug } from 'boardgame.io/debug';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/tic-tac-toe/game.js';

@Component({
  selector: 'bio-tic-tac-toe-single-player-example',
  template: `
    <bio-client gameID="single"></bio-client>
  `,
  providers: [{provide: GameScope, useValue: GameScope.fromConfig({
      game,
      board: BoardComponent,
      debug: { impl: Debug },
    })}],
})
export class SingleplayerComponent {
}

@NgModule({
  declarations: [
    SingleplayerComponent,
  ],
  imports: [
    CommonModule,
    BoardgameIoModule,
  ],
})
export class UselessExamplesModule {
}
