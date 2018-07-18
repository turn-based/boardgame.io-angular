export interface UserProfile {
  nickname: string;
  picture: string;
}

export class Player {
  constructor(public profile?: UserProfile) {
  }
}

export class GameState {
  players: { [entityId: string]: Player; } = {};

  addPlayer(client, user) {
    if (user) {
      this.players[user.sub] = new Player({nickname: user.nickname, picture: user.picture});
    } else {
      this.players[client.id] = new Player();
    }
  }

  removePlayer(client) {
    delete this.players[client.sessionId];
  }
}
