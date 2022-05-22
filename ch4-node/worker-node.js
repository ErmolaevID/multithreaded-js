const { parentPort } = require('node:worker_threads');

parentPort.on('message', (buffer) => {
  buffer.foo = 55;
  const view = new Uint8Array(buffer);
  view[0] = 2;
  console.log('updated by worker');
});
