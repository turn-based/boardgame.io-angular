import { Component } from '@angular/core';
import { BoardComponent, game } from './tic-tac-toe';
import { GameScope } from 'boardgame.io-angular';


@Component({
  selector: 'bio-root',
  template: `
<!--    <bio-client gameID="single"></bio-client>-->
    <bio-navigation></bio-navigation>
  `,
  styles: [],
  providers: [GameScope],
})
export class AppComponent {
  title = 'demo';

  constructor(private gameScope: GameScope) {
    this.gameScope.setConfig({
      game,
      board: BoardComponent,
      ai: {
        enumerate: (G: any) => {
          const r = [];
          for (let i = 0; i < 9; i++) {
            if (G.cells[i] === null) {
              r.push({move: 'clickCell', args: [i]});
            }
          }
          return r;
        },
      },
    });
  }
}
