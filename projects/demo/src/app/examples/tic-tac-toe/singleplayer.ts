import { BoardComponent } from './board.component';
import { Debug } from 'boardgame.io/debug';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/tic-tac-toe/game.js';


export const singlePlayerGameConfig = {
  game,
  board: BoardComponent,
  debug: { impl: Debug },
  ai: {
    enumerate: (G: { cells: any[] }) => {
      const r = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          r.push({ move: 'clickCell', args: [i] });
        }
      }
      return r;
    },
  },
};
