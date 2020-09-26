import { Component, NgModule } from '@angular/core';
import { BoardgameIoModule } from 'boardgame.io-angular';
import { BoardComponent } from './board.component';
import { Debug } from 'boardgame.io/debug';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/tic-tac-toe/game.js';

@Component({
  template: `
    <bio-client gameID="single" [bioGameConfig]="gameConfig"></bio-client>
  `,
})
export class SingleplayerComponent {
  static readonly sectionId = 'Tic-Tac-Toe';
  static readonly exampleName = 'Singleplayer';

  gameConfig = {
    game,
    board: BoardComponent,
    debug: { impl: Debug },
  };
}

@NgModule({
  declarations: [
    SingleplayerComponent,
  ],
  imports: [
    BoardgameIoModule,
  ],
})
export class UselessExamplesModule {
}
