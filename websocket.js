const WebSocket = require('ws');

const ws = new WebSocket.Server({'ws://localhost:8080'});

ws.onopen(() => {
  ws.send('connected');
});
