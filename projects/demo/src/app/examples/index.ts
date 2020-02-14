/* tslint:disable:object-literal-key-quotes */
import TicTacToeExamples from './tic-tac-toe';
import RandomApiExamples from './random';

export interface Example {
  sectionId: string;
  exampleName: string;
}

export const exampleSections: { [sectionId: string]: Example[] } = {
  'Tic-Tac-Toe': TicTacToeExamples,
  'Chess': [
    {sectionId: 'Chess', exampleName: 'Singleplayer'},
    {sectionId: 'Chess', exampleName: 'Multiplayer'},
  ],
  'Random API': RandomApiExamples,
};

export function getExample(sectionId: string | null, exampleName: string | null) {
  if (sectionId != null && exampleName != null) {
    return exampleSections[sectionId].find(e => e.exampleName === exampleName);
  }
}
