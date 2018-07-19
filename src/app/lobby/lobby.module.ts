import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthService } from './auth.service';
import { MaterialModule } from '../material.module';
import { RoomComponent } from './room.component';
import { LobbyComponent } from './lobby.component';
import { BoardsModule } from '../boards/boards.module';
import { Room2Component } from './room2.component';
import { RoomResolver } from './room.resolver';
import { App2Component } from './app2.component';
import { Lobby2Component } from './lobby2.component';
import { MultiplayerPageComponent } from './multiplayer-page.component';
import { StandalonePageComponent } from './standalone-page.component';

@NgModule({
  declarations: [
    RoomComponent,
    AuthCallbackComponent,
    LobbyComponent,

    Room2Component,
    App2Component,
    Lobby2Component,
    MultiplayerPageComponent,
    StandalonePageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    BoardsModule,
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
      }, {
        path: 'app2',
        component: App2Component,
        children: [
          {
            path: 'lobby',
            component: Lobby2Component,
          },
          {
            path: 'rooms/:roomId',
            component: MultiplayerPageComponent,
            resolve: {
              room: RoomResolver
            }
          },
          {
            path: 'standalone',
            component: StandalonePageComponent,
          }
        ]
      }
    ])
  ],
  providers: [
    AuthService,
    RoomResolver,
  ]

})
export class LobbyModule {
}
