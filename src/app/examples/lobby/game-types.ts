import { TicTacToe } from '../tic-tac-toe/game';
import { TicTacToeBoardComponent } from '../tic-tac-toe/tic-tac-toe-board.component';

export const GAME_TYPES = {
  'tic-tac-toe': {
    game: TicTacToe,
    board: TicTacToeBoardComponent,
  },
};
