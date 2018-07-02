import { NgModule } from '@angular/core';

import { UnsupportedExampleComponent } from './unsupported-example.component';
import { ExamplesComponent } from './examples.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SinglePlayerExampleComponent } from './tic-tac-toe/single-player-example.component';
import { MultiPlayerExampleComponent } from './tic-tac-toe/multi-player-example.component';
import { AuthenticatedExampleComponent } from './tic-tac-toe/authenticated-example.component';
import { SpectatorExampleComponent } from './tic-tac-toe/spectator-example.component';
import { BoardgameIoModule } from 'boardgame.io-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TicTacToeBoardComponent } from './tic-tac-toe/tic-tac-toe-board.component';
import { NgxInitModule } from 'ngx-init';
import { PhasesBoardComponent, PhasesExampleComponent } from './phases/phases-example.component';
import { SecretStateBoardComponent, SecretStateExampleComponent } from './secret-state/secret-state-example.component';

@NgModule({
  declarations: [
    UnsupportedExampleComponent,
    ExamplesComponent,

    SinglePlayerExampleComponent,
    MultiPlayerExampleComponent,
    AuthenticatedExampleComponent,
    SpectatorExampleComponent,
    PhasesExampleComponent,
    SecretStateExampleComponent,

    TicTacToeBoardComponent,
    PhasesBoardComponent,
    SecretStateBoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    NgxInitModule,
    MaterialModule,
    BoardgameIoModule,
    RouterModule.forChild([
      {
        path: 'examples',
        component: ExamplesComponent,
        children: [
          {
            path: 'tic-tac-toe/singleplayer',
            component: SinglePlayerExampleComponent,
            data: {
              title: 'Tic-Tac-Toe Singleplayer'
            }
          },
          {
            path: 'tic-tac-toe/multiplayer',
            component: MultiPlayerExampleComponent,
            data: {
              title: 'Tic-Tac-Toe Multiplayer'
            }
          },
          {
            path: 'tic-tac-toe/authenticated',
            component: AuthenticatedExampleComponent,
            data: {
              title: 'Tic-Tac-Toe Authenticated'
            }
          },
          {
            path: 'tic-tac-toe/spectator',
            component: SpectatorExampleComponent,
            data: {
              title: 'Tic-Tac-Toe Spectator'
            }
          },
          {
            path: 'phases',
            component: PhasesExampleComponent,
            data: {
              title: 'phases'
            }
          },
          {
            path: 'liars-dice',
            component: SecretStateExampleComponent,
            data: {
              title: 'Liar\'s Dice'
            }
          },
          {
            path: 'unsupported-example',
            component: UnsupportedExampleComponent,
            data: {
              title: 'Unsupported Example'
            }
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'tic-tac-toe/singleplayer'
          },
          {
            path: '**',
            redirectTo: 'unsupported-example'
          },
        ]
      }])
  ],
  exports: [
    UnsupportedExampleComponent,
    ExamplesComponent,
  ],
  entryComponents: [
    TicTacToeBoardComponent,
    PhasesBoardComponent,
    SecretStateBoardComponent,
  ]
})
export class ExamplesModule {
}
