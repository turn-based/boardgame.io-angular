import { Component, Input } from '@angular/core';
import { Game, PlayerView } from 'boardgame.io/dist/core';

const SecretState = Game({
  name: 'secret-state',

  setup: () => ({
    other: {},
    players: {
      0: 'player 0 state',
      1: 'player 1 state',
      2: 'player 2 state',
    },
  }),

  playerView: PlayerView.STRIP_SECRETS,
});

@Component({
  template: `
    <div class="secret-state">
      <section>
        <pre>{{G | json}}</pre>
      </section>
    </div>
  `,
  styles: [`
    .secret-state section {
      text-align: left;
      padding: 10px;
      margin-bottom: 20px;
      background: #eee;
    }
  `]
})
export class SecretStateBoardComponent {
  @Input() G: any;
}

@Component({
  template: `
    <div fxLayout fxLayoutGap="32px">
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 0</strong>
        <bio-client [game]="SecretState"
                    [numPlayers]="3"
                    [board]="SecretStateBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: 'localhost:8000'}"
                    gameID="secret-state"
                    playerID="0">
        </bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 1</strong>
        <bio-client [game]="SecretState"
                    [numPlayers]="3"
                    [board]="SecretStateBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: 'localhost:8000'}"
                    gameID="secret-state"
                    playerID="1">
        </bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>playerID 2</strong>
        <bio-client [game]="SecretState"
                    [numPlayers]="3"
                    [board]="SecretStateBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: 'localhost:8000'}"
                    gameID="secret-state"
                    playerID="2">
        </bio-client>
      </div>
      <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
        <strong>App</strong>
        <bio-client [game]="SecretState"
                    [numPlayers]="3"
                    [board]="SecretStateBoardComponent"
                    [debug]="false"
                    [multiplayer]="{server: 'localhost:8000'}"
                    gameID="secret-state">
        </bio-client>
      </div>
    </div>
  `
})
export class SecretStateExampleComponent {
  SecretState = SecretState;
  SecretStateBoardComponent = SecretStateBoardComponent;
}
