const worker = new RpcWorker("worker.js");

Promise.allSettled([
  worker.exec("squareMax", 1_000_000),
  worker.exec("fibonacci", 1_000),
  worker.exec("fake"),
  worker.exec("bad"),
]).then(([squareSum, fib, fake, bad]) => {
  console.log("sqaureMax", squareSum);
  console.log("fibonacci", fib);
  console.log("fake", fake);
  console.log("bad", bad);
})
