/* tslint:disable:object-literal-key-quotes */

import {singlePlayerGameConfig as TicTacToeGameConfig} from './tic-tac-toe/singleplayer';

export interface Example {
  sectionId: string;
  name: string;
  gameConfig?: any;
}

const exampleSections: { [sectionId: string]: { [exampleName: string]: Example } } = {
  'Tic-Tac-Toe': {
    'Singleplayer': {
      sectionId: 'Tic-Tac-Toe', name: 'Singleplayer',
      gameConfig: TicTacToeGameConfig,
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
