import TicTacToeExamples from './tic-tac-toe';
import RandomApiExamples from './random';
import RedactedMoveExamples from './redacted-move';

export interface Example {
  sectionId: string;
  exampleName: string;
}

export const exampleSections: { [sectionId: string]: Example[] } = {
  'Tic-Tac-Toe': TicTacToeExamples,
  'Random API': RandomApiExamples,
  'Redacted Move': RedactedMoveExamples
};

export function getExample(sectionId: string | null, exampleName: string | null) {
  if (sectionId != null && exampleName != null) {
    return exampleSections[sectionId].find(e => e.exampleName === exampleName);
  }
}
