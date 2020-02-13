import { BoardComponent } from './board.component';
import { Debug } from 'boardgame.io/debug';
// @ts-ignore
import game from '../../../../../../boardgame.io/examples/react-web/src/tic-tac-toe/game.js';


export const singlePlayerGameConfig = {
  game,
  board: BoardComponent,
  debug: { impl: Debug },
};
