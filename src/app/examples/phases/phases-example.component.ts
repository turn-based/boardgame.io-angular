import { Component, Input } from '@angular/core';
import { Game } from 'boardgame.io/dist/core';

const game = Game({
  setup: () => ({deck: 5, hand: 0}),

  moves: {
    takeCard: G => ({...G, deck: G.deck - 1, hand: G.hand + 1}),
    playCard: G => ({...G, deck: G.deck + 1, hand: G.hand - 1}),
  },

  flow: {
    phases: [
      {
        name: 'take phase',
        endPhaseIf: G => G.deck <= 0,
        allowedMoves: ['takeCard'],
      },
      {
        name: 'play phase',
        allowedMoves: ['playCard'],
        endPhaseIf: G => G.hand <= 0,
      },
    ],
  },
});

@Component({
  template: `
    <div class="phases">
      <li [style]="{background: '#aaa'}">{{ctx.phase}}</li>
      <li>Deck: {{G.deck}}</li>
      <li>Hand: {{G.hand}}</li>
      <li>
        <button id="take" (click)="takeCard()">
          Take Card
        </button>
      </li>
      <li>
        <button id="play" (click)="playCard()">
          Play Card
        </button>
      </li>
    </div>
  `,
  styles: [`
    .phases li {
      list-style: none;
      width: 200px;
      border: 1px solid #eee;
      border-top: none;
      padding: 5px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  `]
})
export class PhasesBoardComponent {
  @Input() G: any;
  @Input() ctx: any;
  @Input() moves: any;
  @Input() events: any;

  takeCard() {
    // noinspection TsLint
    if (this.ctx.phase != 'take phase') { return; }
    this.moves.takeCard();
    this.events.endTurn();
  }

  playCard() {
    // noinspection TsLint
    if (this.ctx.phase != 'play phase') { return; }
    this.moves.playCard();
    this.events.endTurn();
  }
}

@Component({
  template: `
    <bio-client [game]="game"
                [numPlayers]="1"
                [board]="PhasesBoardComponent"></bio-client>
  `
})
export class PhasesExampleComponent {
  game = game;
  PhasesBoardComponent = PhasesBoardComponent;
}
