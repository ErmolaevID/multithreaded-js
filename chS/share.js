const threads = require('node:worker_threads');
const { Worker } = threads;

const buffer = new SharedArrayBuffer(1024);
const arr = new Int8Array(buffer);

const worker = new Worker('./share-worker.js', { workerData: { buffer } });

worker.on('message', (msg) => {
  if (msg === 'display') {
    console.log('Arr first el: ', arr[0]);
  }
});

process.on('SIGTERM', () => {
  worker.terminate(() => {
    console.log('Terminate worker');
  });
});

