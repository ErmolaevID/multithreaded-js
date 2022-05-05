console.log("red js file start");

const worker = new SharedWorker("shared-worker.js");

worker.port.onmessage = (event) => {
  console.log("EVENT ", event.data);
};
