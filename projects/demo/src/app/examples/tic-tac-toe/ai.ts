import { AI } from 'boardgame.io/dist/ai';

export const ai = AI({
  enumerate: G => {
    const r = [];
    for (let i = 0; i < 9; i++) {
      if (G.cells[i] === null) {
        r.push({ move: 'clickCell', args: [i] });
      }
    }
    return r;
  },
});
