import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule, GameScope } from 'boardgame.io-angular';
import { BoardComponent } from './board.component';

import { Local } from 'boardgame.io/multiplayer';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/secret-state/game.js';

@Component({
  template: `
    <div class="runner">
      <div class="run">
        <bio-client gameID="secret-state" playerID="0"></bio-client>
        &lt;App playerID=&quot;0&quot;/&gt;
      </div>
      <div class="run">
        <bio-client gameID="secret-state" playerID="1"></bio-client>
        &lt;App playerID=&quot;1&quot;/&gt;
      </div>
      <div class="run">
        <bio-client gameID="secret-state" playerID="2"></bio-client>
        &lt;App playerID=&quot;2&quot;/&gt;
      </div>
      <div class="run">
        <bio-client gameID="secret-state"></bio-client>
        &lt;App/&gt;
      </div>
    </div>
  `,
  providers: [{
    provide: GameScope, useValue: GameScope.fromConfig({
      game,
      numPlayers: 3,
      board: BoardComponent,
      debug: false,
      multiplayer: Local(),
    })
  }],
})
export class MultiviewComponent {
  static readonly sectionId = 'Secret State';
  static readonly exampleName = 'Example';
}

@NgModule({
  declarations: [
    MultiviewComponent,
  ],
  imports: [
    BoardgameIoModule,
  ],
})
export class UselessExamplesModule {
}
