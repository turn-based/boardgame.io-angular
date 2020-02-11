/* tslint:disable:object-literal-key-quotes */
import { BoardComponent, game } from './tic-tac-toe';

export interface Example {
  sectionId: string;
  name: string;
  gameConfig?: any;
}

const exampleSections: { [sectionId: string]: { [exampleName: string]: Example } } = {
  'Tic-Tac-Toe': {
    'Singleplayer': {
      sectionId: 'Tic-Tac-Toe', name: 'Singleplayer',
      gameConfig: {
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
      }
    },
    'Multiplayer': {sectionId: 'Tic-Tac-Toe', name: 'Multiplayer'},
    'Authenticated': {sectionId: 'Tic-Tac-Toe', name: 'Authenticated'},
    'Spectator': {sectionId: 'Tic-Tac-Toe', name: 'Spectator'},
  },
  'Chess': {
    'Singleplayer': {sectionId: 'Chess', name: 'Singleplayer'},
    'Multiplayer': {sectionId: 'Chess', name: 'Multiplayer'},
  }
};

export function getExample(sectionId: string | null, exampleName: string | null) {
  if (sectionId != null && exampleName != null) {
    return exampleSections[sectionId][exampleName];
  }
}
