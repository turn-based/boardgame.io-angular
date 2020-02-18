import { NgModule } from '@angular/core';
import { BioClientComponent } from './bio-client.component';
import { CommonModule } from '@angular/common';
import { GameConfigDirective } from './game-config.directive';



@NgModule({
  declarations: [BioClientComponent, GameConfigDirective],
  imports: [
    CommonModule,
  ],
  exports: [BioClientComponent, GameConfigDirective]
})
export class BoardgameIoModule { }
