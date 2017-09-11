
import { createWebsocket, sendPosition } from './websocket';
import { getCanvas } from './render';


const rect = getCanvas().getBoundingClientRect();

// TODO chill if too many events are created
// TODO make the code not super ugly :)
getCanvas().onmousemove = (e) => {
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  sendPosition(x, y);
};


console.log('index.html');
createWebsocket();
