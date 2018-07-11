import { Room } from 'colyseus';

export class ChatRoom extends Room {
  // this room supports only 4 clients connected
  maxClients = 4;

  onInit(options) {
    this.setState({myTest: {status: ['ok']}});
    console.log('BasicRoom created!', options);
  }

  onJoin(client) {
    this.broadcast(`${ client.sessionId } joined.`);
  }

  onLeave(client) {
    this.broadcast(`${ client.sessionId } left.`);
  }

  onMessage(client, data) {
    console.log('BasicRoom received message from', client.sessionId, ':', data);
    this.state.myTest.status = [...this.state.myTest.status, 'real good'];

    this.broadcast(`(${ client.sessionId }) ${ data.message }`);
  }

  onDispose() {
    console.log('Dispose BasicRoom');
  }

}
