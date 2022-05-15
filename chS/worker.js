const threads = require('node:worker_threads');
const { Worker } = threads;

if (threads.isMainThread) {
  const workerData = { text: 'Data from main' };
  const worker = new Worker(__filename, { workerData });
  console.dir(threads);
  worker.on('message', (...args) => {
    console.log({ args });
  });
  worker.on('error', (err) => {
    console.error(err.stack);
  });
  worker.on('exit', (code) => {
    console.log(code);
  });
} else {
  console.dir(threads);
  threads.parentPort.postMessage('Hello from non main thread');
}
