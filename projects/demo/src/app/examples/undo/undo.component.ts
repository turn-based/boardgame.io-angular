import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule, GameScope } from 'boardgame.io-angular';
import { BoardComponent } from './board.component';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/undo/game.js';
import { Local } from "boardgame.io/multiplayer";

@Component({
  template: `
    <div class="runner" >
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
  providers: [{provide: GameScope, useValue: GameScope.fromConfig({
      game,
      numPlayers: 2,
      board: BoardComponent,
      multiplayer: Local(),
    })}],
})
export class UndoComponent {
  static readonly sectionId = 'Undo';
  static readonly exampleName = 'Example';
}

@NgModule({
  declarations: [
    UndoComponent,
  ],
  imports: [
    BoardgameIoModule,
  ],
})
export class UselessExamplesModule {
}
