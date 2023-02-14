import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { createApp } from './src/main';
import { Server } from 'http';

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/ttf',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

let serverInstance: Server;
if (serverInstance === undefined) {
  const server = createApp();
  server.use(eventContext());
  serverInstance = createServer(server, null, binaryMimeTypes);
}

export const webApp = (event, context) => {
  proxy(serverInstance, event, context);
};
