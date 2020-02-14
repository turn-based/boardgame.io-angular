import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule, GameScope } from 'boardgame.io-angular';
import { BoardComponent } from './board.component';

import { Local } from 'boardgame.io/multiplayer';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/redacted-move/game.js';

@Component({
  template: `
    <p>
      This examples demonstrates the use of redacted moves. Using redacted moves
      allows for secret information to be stripped from the log for other
      players.
    </p>
    <p>
      Clicking the button on one of the players, you should see complete log
      event for that player but a redacted one for everyone else.
    </p>
    <div class="runner">
      <div class="run">
        <bio-client gameID="redacted-move" playerID="0"></bio-client>
        &lt;App playerID=&quot;0&quot;/&gt;
      </div>
      <div class="run">
        <bio-client gameID="redacted-move" playerID="1"></bio-client>
        &lt;App playerID=&quot;1&quot;/&gt;
      </div>
      <div class="run">
        <bio-client gameID="redacted-move"></bio-client>
        &lt;App/&gt;
      </div>
    </div>
  `,
  providers: [{
    provide: GameScope, useValue: GameScope.fromConfig({
      game,
      numPlayers: 2,
      board: BoardComponent,
      debug: false,
      multiplayer: Local(),
    })
  }],
})
export class MultiviewComponent {
  static readonly exampleName = 'Example';
  static readonly sectionId = 'Redacted Move';
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
