import { Room } from 'colyseus';

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
  onInit() {
    this.maxClients = 2;

    this.setState({
      currentTurn: null,
      players: [],
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      winner: null,
      draw: null
    });
  }

  onJoin(client) {
    const idx = this.state.players.length;
    client.playerIndex = idx;
    this.state.players.push({...MOCK_PLAYERS[idx], id: client.sessionId});

    if (this.clients.length === 2) {
      this.state.currentTurn = client.sessionId;

      this.lock();
    }
  }

  onMessage(client, data) {
    if (this.state.winner || this.state.draw) {
      return false;
    }

    if (client.sessionId === this.state.currentTurn) {
      if (this.state.board[data.x][data.y] === 0) {
        const move = (client.playerIndex === 0) ? 'x' : 'o';
        this.state.board[data.x][data.y] = move;

        if (this.checkWin(data.x, data.y, move)) {
          this.state.winner = client.sessionId;

        } else if (this.checkBoardComplete()) {
          this.state.draw = true;

        } else {
          // switch turn
          const otherPlayerIndex = (client.playerIndex === 0) ? 1 : 0;

          this.state.currentTurn = this.state.players[otherPlayerIndex].id;
        }
      }
    }
  }

  checkBoardComplete() {
    return this._flatten(this.state.board).filter(item => item === 0).length === 0;
  }

  checkWin(x, y, move) {
    let won = false;
    const board = this.state.board;
    const boardSize = this.state.board.length;

    // horizontal
    for (let i = 0; i < boardSize; i++) {
      if (board[x][i] !== move) {
        break;
      }
      if (i === boardSize - 1) {
        won = true;
      }
    }

    // vertical
    for (let i = 0; i < boardSize; i++) {
      if (board[i][y] !== move) {
        break;
      }
      if (i === boardSize - 1) {
        won = true;
      }
    }

    // cross forward
    if (x === y) {
      for (let i = 0; i < boardSize; i++) {
        if (board[i][i] !== move) {
          break;
        }
        if (i === boardSize - 1) {
          won = true;
        }
      }
    }

    // cross backward
    for (let i = 0; i < boardSize; i++) {
      if (board[i][(boardSize - 1) - i] !== move) {
        break;
      }
      if (i === boardSize - 1) {
        won = true;
      }
    }

    return won;
  }

  onLeave(client) {
    const idx = this.state.players.findIndex(player => player.id = client.sessionId);
    this.state.players = [...this.state.players.slice(0, idx), ...this.state.players.slice(idx + 1)];

    if (this.state.players.length > 0 && !this.state.winner && !this.state.draw) {
      this.state.winner = this.state.players[0].id;
    }
  }

  _flatten(arr, previous?) {
    const flattened = previous || [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
        this._flatten(arr[i], flattened);
      } else {
        flattened.push(arr[i]);
      }
    }

    return flattened;
  }

}
