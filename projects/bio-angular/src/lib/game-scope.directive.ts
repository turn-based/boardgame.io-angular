import { Directive, Host, Input } from '@angular/core';
import { GameConfig, GameScope } from './config';

@Directive({
  selector: '[bioGameScope]',
  providers: [{provide: GameScope}],
})
export class GameScopeDirective {
  @Input() set bioGameScope(gameConfig: GameConfig) {
    this.gameScope.setConfig(gameConfig);
  }

  constructor(@Host() private gameScope: GameScope) { }

}
