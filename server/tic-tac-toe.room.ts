import { Room } from 'colyseus';

import { CreateGameReducer } from 'boardgame.io/core';
import { TicTacToe } from '../shared/games/tic-tac-toe';
import { createStore } from 'redux';

export class TicTacToeRoom extends Room<any> {
  store: any;

  onInit(options) {
    console.log('TicTacToeRoom created!', options);

    const reducer = CreateGameReducer({
      game: TicTacToe,
      numPlayers: 2,
    });
    this.store = createStore(reducer);

    this.setState(this.store.getState());
  }

  onJoin(client) {
    console.log('Join TicTacToeRoom', client.sessionId);
    // this.state.createPlayer(client.sessionId);
  }

  onLeave(client) {
    console.log('Leave TicTacToeRoom', client.sessionId);
    // this.state.removePlayer(client.sessionId);
  }

  onMessage(client, data) {
    console.log('TicTacToeRoom received message from', client.sessionId, ':', data);

    this.store.dispatch(data.action);

    this.state = this.store.getState();
  }

  onDispose() {
    console.log('Dispose TicTacToeRoom');
  }

}
