import { Server } from 'boardgame.io/server';
import KoaHelmet from 'koa-helmet';
import mount from 'koa-mount';
import { TicTacToe } from '../shared/games/tic-tac-toe';

const PORT = process.env.PORT || 8000;

const server = Server({games: [TicTacToe]});

if (process.env.NODE_ENV !== 'development') {
    server.app.use(KoaHelmet());
}

server.app.use(mount('/api/v1', server.api));

(async () => {
    await server.db.connect();
    server.app.listen(PORT, () => {
        console.log(`Serving at: http://localhost:${PORT}/`);
    });
})();
