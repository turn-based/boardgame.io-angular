import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule, GameScope } from 'boardgame.io-angular';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';

import { Local } from 'boardgame.io/multiplayer';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/tic-tac-toe/game.js';

@Component({
  template: `
    <div class="runner">
      <div class="run">
        <bio-client gameID="multi" playerID="0"></bio-client>
        &lt;App playerID=&quot;0&quot;/&gt;
      </div>
      <div class="run">
        <bio-client gameID="multi" playerID="1"></bio-client>
        &lt;App playerID=&quot;1&quot;/&gt;
      </div>
    </div>
  `,
  providers: [{
    provide: GameScope, useValue: GameScope.fromConfig({
      game,
      board: BoardComponent,
      debug: false,
      multiplayer: Local(),
    })
  }],
})
export class MultiplayerComponent {
  static readonly sectionId = 'Tic-Tac-Toe';
  static readonly exampleName = 'Multiplayer';
}

@NgModule({
  declarations: [
    MultiplayerComponent,
  ],
  imports: [
    BoardgameIoModule,
  ],
})
export class UselessExamplesModule {
}
