import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthService } from './auth.service';
import { MaterialModule } from '../material.module';
import { PrettyMsPipe } from './pretty-ms.pipe';
import { RoomComponent } from './room.component';

@NgModule({
  declarations: [
    LobbyComponent,
    RoomComponent,
    AuthCallbackComponent,
    PrettyMsPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    RouterModule.forChild([
      {
        path: 'lobby',
        component: LobbyComponent,
      }, {
        path: 'callback',
        component: AuthCallbackComponent,
      }, {
        path: 'rooms/:roomId',
        component: RoomComponent,
      }
      // children: [
      //   {
      //     path: 'tic-tac-toe/singleplayer',
      //     component: SinglePlayerExampleComponent,
      //     data: {
      //       title: 'Tic-Tac-Toe Singleplayer'
      //     }
      //   },
      //   {
      //     path: '',
      //     pathMatch: 'full',
      //     redirectTo: 'tic-tac-toe/singleplayer'
      //   },
      //   {
      //     path: '**',
      //     redirectTo: 'unsupported-example'
      //   },
      // ]
      // }
    ])
  ],
  providers: [
    AuthService,
  ]

})
export class LobbyModule {
}
