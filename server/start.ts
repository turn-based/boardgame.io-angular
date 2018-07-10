import { Server } from 'boardgame.io/server';
import KoaHelmet from 'koa-helmet';
import mount from 'koa-mount';
import { TicTacToe } from '../shared/games/tic-tac-toe';
import Router from 'koa-router';
import Koa from 'koa';
import jwt from 'koa-jwt';
import { koaJwtSecret } from 'jwks-rsa';
import cors from '@koa/cors';

const PORT = process.env.PORT || 8000;

const server = Server({games: [TicTacToe]});

if (process.env.NODE_ENV !== 'development') {
  server.app.use(KoaHelmet());
}
server.app.use(mount('/api/v1', server.api));


const jwtCheck = jwt({
  secret: koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://amitport.auth0.com/.well-known/jwks.json'
  }) as any,
  audience: 'https://api.turn-based.com',
  issuer: 'https://amitport.auth0.com/',
  algorithms: ['RS256']
});

const app = new Koa();
const router = new Router();

router.get('/ping', (ctx) => {
  ctx.body = ctx.state.user;
});

app
  .use(cors())
  .use(jwtCheck)
  .use(router.routes())
  .use(router.allowedMethods());

server.app.use(mount('/api-authorized', app));

(async () => {
  await server.db.connect();
  server.app.listen(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`);
  });
})();
