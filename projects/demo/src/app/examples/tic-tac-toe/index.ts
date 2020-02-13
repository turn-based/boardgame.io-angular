/* tslint:disable:object-literal-key-quotes */

import { SingleplayerComponent } from './singleplayer.component';
import { MultiplayerComponent } from './multiplayer.component';

export default {
  'Singleplayer': {
    sectionId: 'Tic-Tac-Toe', name: 'Singleplayer',
    component: SingleplayerComponent,
  },
  'Multiplayer': {
    sectionId: 'Tic-Tac-Toe', name: 'Multiplayer',
    component: MultiplayerComponent
  },
  'Authenticated': {sectionId: 'Tic-Tac-Toe', name: 'Authenticated'},
  'Spectator': {sectionId: 'Tic-Tac-Toe', name: 'Spectator'},
};
