import { Jwk } from 'jwks-rsa';
import { decode as decodeJws } from 'jws';
import { JwksClient } from 'jwks-rsa/lib/JwksClient';
import { promisify } from 'util';
import { decode, verify } from 'jsonwebtoken';
import request from 'request-promise-native';

const jwksClient = new JwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://amitport.auth0.com/.well-known/jwks.json'
}) as JwksClient & { asyncGetSigningKey: (kid: string) => Promise<Jwk> };
jwksClient.asyncGetSigningKey = promisify(jwksClient.getSigningKey);
const asyncVerifyToken = promisify(verify);

export async function getUserFromToken(token) {
  // just get the header
  const decoded = decodeJws(token);

  if (!decoded || !decoded.header) {
    throw new Error('Invalid token');
  }

  const {alg, kid} = decoded.header;

  if (alg !== 'RS256') {
    throw new Error('Missing / invalid token algorithm');
  }

  // get auth0 public key for verifying the access_token
  const jwk = await jwksClient.asyncGetSigningKey(kid);
  const auth0PublicKey = jwk.publicKey || jwk.rsaPublicKey;

  if (!auth0PublicKey) {
    throw new Error('Secret not provided');
  }

  // verify user is allowed access to https://api.turn-based.com
  await asyncVerifyToken(token, auth0PublicKey, {
    audience: 'https://api.turn-based.com',
    issuer: 'https://amitport.auth0.com/',
    algorithms: ['RS256']
  });

  return request({
    uri: 'https://amitport.auth0.com/userinfo',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    json: true
  });
}
