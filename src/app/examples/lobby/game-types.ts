import { TicTacToeBoardComponent } from '../../boards/tic-tac-toe-board.component';
import { TicTacToe } from '../../../../shared/games/tic-tac-toe';

export const GAME_TYPES = {
  'tic-tac-toe': {
    game: TicTacToe,
    board: TicTacToeBoardComponent,
  },
};
