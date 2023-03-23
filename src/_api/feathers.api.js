// import feathersAuth from '@feathersjs/authentication-client';
// import socketio from '@feathersjs/socketio-client';

import { feathers } from '@feathersjs/feathers';
import io from 'socket.io-client';

import { BASE_URL } from '../utils/constants';

const options = {
  header: 'Authorization',
  scheme: 'Bearer',
  path: '/authentication',
  jwtStrategy: ['jwt', 'local', 'google'],
  entity: 'user',
  service: 'users',
  cookie: 'feathers-jwt',
  storageKey: 'feathers-jwt',
  storage: window.localStorage,
};

const socket = io(BASE_URL, {
  reconnectionDelay: 5000,
  transports: ['websocket'],
});

socket.on('connect_error', (e) => {
  console.log('connection error');
});

const client = feathers();

client.configure(feathers.socketio(socket));

// client.configure(feathersAuth(options));
// client.configure(feathers.authentication());

const userService = client.service('users');
const boardsService = client.service('boards');

const listsService = client.service('lists');
const cardsService = client.service('cards');

const notificationsService = client.service('notifications');

export {
  client,
  userService,
  boardsService,
  listsService,
  cardsService,
  notificationsService,
};
