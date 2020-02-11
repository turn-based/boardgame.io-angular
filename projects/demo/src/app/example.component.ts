import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameScope } from 'boardgame.io-angular';
import { Example } from './examples';

@Component({
  template: `
    <bio-client *ngIf="showClient; else noConfig" gameID="single"></bio-client>
    <ng-template #noConfig>Could not find game config</ng-template>
  `,
  providers: [GameScope],
})
export class ExampleComponent {
  showClient = false;

  constructor(route: ActivatedRoute, gameScope: GameScope) {
    route.data.subscribe(({example}: {example: Example}) => {
      if (example.hasOwnProperty('gameConfig')) {
        gameScope.setConfig(example.gameConfig);
        this.showClient = true;
      } else {
        this.showClient = false;
      }
    });
  }
}
