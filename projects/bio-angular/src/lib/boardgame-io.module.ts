import { NgModule } from '@angular/core';
import { BioClientComponent } from './bio-client.component';
import { CommonModule } from '@angular/common';
import { GameScopeDirective } from './game-scope.directive';



@NgModule({
  declarations: [BioClientComponent, GameScopeDirective],
  imports: [
    CommonModule,
  ],
  exports: [BioClientComponent, GameScopeDirective]
})
export class BoardgameIoModule { }
