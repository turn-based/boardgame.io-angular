export const { SERVER_HOST, SERVER_SCHEMA } =
  ['local.com', 'localhost'].includes(window.location.hostname) ?
    {SERVER_HOST: 'localhost:8000', SERVER_SCHEMA: 'http'} :
    {SERVER_HOST: 'turn-based-api.herokuapp.com', SERVER_SCHEMA: 'https'};

export const SERVER_ORIGIN = `${SERVER_SCHEMA}://${SERVER_HOST}`;
