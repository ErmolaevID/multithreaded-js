if (!crossOriginIsolated) {
  throw new Error('Невозможно использовать SharedArrayBuffer');
}

const worker = new Worker('worker.js');

const buffer = new SharedArrayBuffer(1024);
const view = new Uint8Array(buffer);

console.log('now', view[0]);

worker.postMessage(buffer);

setTimeout(() => {
  console.log('after', view[0]);
  console.log('prop', buffer.foo);
})
