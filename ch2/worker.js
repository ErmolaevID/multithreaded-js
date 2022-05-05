console.log("worker start");

self.onmessage = (msg) => {
  console.log("Message from main ", msg.data)

  postMessage("Send from worker");
};

console.log("worker end");
