import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule, GameScope } from 'boardgame.io-angular';
import { BoardComponent } from './board.component';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/random/game.js';

@Component({
  template: `
    <bio-client gameID="Random"></bio-client>
  `,
  providers: [{provide: GameScope, useValue: GameScope.fromConfig({
      game,
      numPlayers: 1,
      board: BoardComponent,
    })}],
})
export class RandomApiComponent {
  static readonly exampleName = 'Random API';
  static readonly sectionId = 'Examples';
}

@NgModule({
  declarations: [
    RandomApiComponent,
  ],
  imports: [
    BoardgameIoModule,
  ],
})
export class UselessExamplesModule {
}
