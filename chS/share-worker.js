const threads = require('node:worker_threads');

const { buffer } = threads.workerData;

const arr = new Int8Array(buffer);

arr[0] = 5;

threads.parentPort.postMessage('display');
