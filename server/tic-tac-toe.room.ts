import { Client, Room } from 'colyseus';

import { CreateGameReducer } from 'boardgame.io/core';
import { TicTacToe } from '../shared/games/tic-tac-toe';
import { createStore } from 'redux';
import { decode, verify } from 'jsonwebtoken';
import { getUserFromToken } from './get-user-from-token';
import { GameState } from './game-state';


// trick to get room's players into boardgame.io's ctx
function ServerTicTacToe(this: any, players) {
  this.players = players;
}

ServerTicTacToe.prototype = Object.create(TicTacToe);
ServerTicTacToe.prototype.setup = function (ctx) {
  ctx.players = this.players;
  return TicTacToe.setup(ctx);
};


export class TicTacToeRoom extends Room<{ bgio: any, game: GameState }> {
  store: any;

  async onAuth(options) {
    return {user: options.accessToken ? await getUserFromToken(options.accessToken) : false};
  }

  onInit(options) {
    console.log('TicTacToeRoom created!');

    this.setSeatReservationTime(10);

    const reducer = CreateGameReducer({
      game: new ServerTicTacToe(['testing2']),
      numPlayers: 2,
    });
    this.store = createStore(reducer);

    this.setState({bgio: this.store.getState(), game: new GameState()});
  }

  onJoin(client: Client, options?: any, auth?: any) {
    this.state.game.addPlayer(client, auth.user);
    // this.state.createPlayer(client.sessionId);
  }

  onLeave(client) {
    console.log('Leave TicTacToeRoom', client.sessionId);
    // this.state.removePlayer(client.sessionId);

    this.state.game.removePlayer(client);
  }

  onMessage(client, data) {
    console.log('TicTacToeRoom received message from', client.sessionId, ':', data);

    this.store.dispatch(data.action);

    this.state.bgio = this.store.getState();
  }

  onDispose() {
    console.log('Dispose TicTacToeRoom');
  }

}
