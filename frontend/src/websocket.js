/* eslint-disable no-console */
import socketio from 'socket.io-client';

import serverUrl from './serverUrl';
import render from './render';

let websocket;

export const createWebsocket = () => {
  console.log(`connecting to ${serverUrl()}`);
  const socket = socketio(serverUrl());
  socket.on('connect', () => {
    console.log('connected to server');
  });
  socket.on('board', (board) => {
    render(board);
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

export const getWebsocket = () => websocket;

export const sendEvent = (event, content, cb) => {
  websocket.emit(event, content, cb);
};
