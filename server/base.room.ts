import { Room } from 'colyseus';
import { CreateGameReducer } from 'boardgame.io/core';
import { createStore } from 'redux';
import { IsVictory, TicTacToe } from '../shared/games/tic-tac-toe';

const MOCK_PLAYERS = [
  {
    profile: {
      nickname: 'itsME',
      picture: 'https://api.adorable.io/avatars/162/itsME@adorable.png',
    },
    color: 'rgb(102,127,203)',
  },
  {
    profile: {
      nickname: 'JohnJohn',
      picture: 'https://api.adorable.io/avatars/162/John@adorable.png',
    },
    color: 'rgb(234, 123, 123)',
  }
];

export class BaseRoom extends Room {
  store: any;

  onInit() {
    this.maxClients = 2;

    const reducer = CreateGameReducer({
      game: TicTacToe,
      numPlayers: 2,
    });
    this.store = createStore(reducer);

    this.setState({
      bgio: this.store.getState(),
      currentTurn: null,
      players: [],
      cells: Array(9).fill(null),
      winner: null,
      draw: null
    });
  }

  onJoin(client) {
    const idx = this.state.players.length.toString();
    client.playerIndex = idx;
    this.state.players.push({...MOCK_PLAYERS[idx], idx, id: client.sessionId});

    if (this.clients.length === 2) {
      this.state.currentTurn = this.state.players[0].id;

      this.lock();
    }
  }

  onMessage(client, data) {
    if (TicTacToe.flow.canPlayerMakeMove(this.state.bgio.G, this.state.bgio.ctx, client.playerIndex)) {
      this.store.dispatch(data.action);
      this.state.bgio = this.store.getState();
    }

    if (this.state.winner || this.state.draw) {
      return false;
    }

    const cellIdx = data.action.payload.args;
    if (client.sessionId === this.state.currentTurn) {
      if (this.state.cells[cellIdx] == null) {
        const move = (client.playerIndex === '0') ? 'x' : 'o';
        this.state.cells[cellIdx] = move;

        if (IsVictory(this.state.cells)) {
          this.state.winner = client.sessionId;

        } else if (this.checkBoardComplete()) {
          this.state.draw = true;

        } else {
          // switch turn
          const otherPlayerIndex = (client.playerIndex === '0') ? 1 : 0;

          this.state.currentTurn = this.state.players[otherPlayerIndex].id;
        }
      }
    }
  }

  checkBoardComplete() {
    return this.state.cells.every(item => item !== null);
  }

  onLeave(client) {
    const idx = this.state.players.findIndex(player => player.id = client.sessionId);
    this.state.players = [...this.state.players.slice(0, idx), ...this.state.players.slice(idx + 1)];

    if (this.state.players.length > 0 && !this.state.winner && !this.state.draw) {
      this.state.winner = this.state.players[0].id;
    }
  }
}
