import { Directive, Host, Input } from '@angular/core';
import { GameConfig, GameScope } from './config';

@Directive({
  selector: '[bioGameConfig]',
  providers: [{provide: GameScope}],
})
export class GameConfigDirective {
  @Input() set bioGameConfig(gameConfig: GameConfig) {
    this.gameScope.setConfig(gameConfig);
  }

  constructor(@Host() private gameScope: GameScope) { }

}
