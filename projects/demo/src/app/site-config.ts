export const { SERVER_HOSTNAME, SERVER_SCHEMA } =
  ['local.com', 'localhost'].includes(window.location.hostname) ?
    {SERVER_HOSTNAME: 'localhost:8000', SERVER_SCHEMA: 'http'} :
    {SERVER_HOSTNAME: 'turn-based-api.herokuapp.com', SERVER_SCHEMA: 'https'};

export const SERVER_ORIGIN = `${SERVER_SCHEMA}://${SERVER_HOSTNAME}`;
