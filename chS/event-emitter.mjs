import { EventEmitter } from 'events'

class MyEventEmitter extends EventEmitter {}

const d = new MyEventEmitter();

d.on('event', (obj) => console.log(obj));

d.prependListener('event', (event) => {
  event.test = false;
})

d.emit('event', { test: true });


