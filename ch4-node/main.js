const { Worker } = require('node:worker_threads');
const worker = new Worker(__dirname + '/worker-node.js');

const buffer = new SharedArrayBuffer(1024);
const view = new Uint16Array(buffer);

console.log('now', view[0]);

worker.postMessage(buffer);

setTimeout(() => {
  console.log('after', view[0]);
  console.log('prop', buffer.foo);
  worker.unref();
}, 500);
