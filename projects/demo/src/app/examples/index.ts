/* tslint:disable:object-literal-key-quotes */
import TicTacToeExamples from './tic-tac-toe';

export interface Example {
  sectionId: string;
  name: string;
  component?: object;
}

const exampleSections: { [sectionId: string]: { [exampleName: string]: Example } } = {
  'Tic-Tac-Toe': TicTacToeExamples,
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
