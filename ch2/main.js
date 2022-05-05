console.log("start");

const worker = new Worker("worker.js");

worker.onmessage = (msg) => {
  console.log("Message from worker " + msg.data);
};

worker.postMessage("Send from main")

console.log("end");
