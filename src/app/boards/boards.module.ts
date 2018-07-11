import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';
import { NgxInitModule } from 'ngx-init';

const BOARDS = [TicTacToeBoardComponent];

@NgModule({
  declarations: BOARDS,
  imports: [
    CommonModule,
    NgxInitModule,
  ],
  exports: BOARDS,
  entryComponents: BOARDS
})
export class BoardsModule {
}
