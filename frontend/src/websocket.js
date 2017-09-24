/* eslint-disable no-console */
import socketio from 'socket.io-client';

import serverUrl from './serverUrl';

let websocket;

export const createWebsocket = () => {
  console.log(`connecting to ${serverUrl()}`);
  const socket = socketio(serverUrl());
  socket.on('connect', () => {
    console.log('connected to server');
  });
  socket.on('disconnect', () => {
    console.log('Websocket disconnected');
  });
  socket.on('error', (errorObj) => {
    console.log('Unknown websocket error');
    console.log(JSON.stringify(errorObj));
  });
  websocket = socket;
};

export const sendPosition = (x, y) => {
  sendEvent('position', { x, y });
};

export const sendName = (name) => {
  sendEvent('name', { name });
};

export const registerListener = (event, func) => {
  websocket.on(event, func);
};

export const getId = () => websocket.id;

const sendEvent = (event, content, cb) => {
  websocket.emit(event, content, cb);
};
