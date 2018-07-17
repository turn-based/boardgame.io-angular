import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthService } from './auth.service';
import { MaterialModule } from '../material.module';
import { RoomComponent } from './room.component';
import { LobbyComponent } from './lobby.component';
import { BoardsModule } from '../boards/boards.module';

@NgModule({
  declarations: [
    RoomComponent,
    AuthCallbackComponent,
    LobbyComponent,
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
      }
    ])
  ],
  providers: [
    AuthService,
  ]

})
export class LobbyModule {
}
