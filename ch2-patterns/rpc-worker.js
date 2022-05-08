class RpcWorker {
  constructor(path) {
    this.nextCommandId = 0;
    this.inFlightCommands = new Map();
    this.worker = new Worker(path);
    this.worker.onmessage = this.onMessageHandle.bind(this);
  }

  onMessageHandle(msg) {
    const { result, error, id } = msg.data;
    const { resolve, reject } = this.inFlightCommands.get(id);
    this.inFlightCommands.delete(id);
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  }

  exec(method, ...args) {
    const id = ++this.nextCommandId;
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      [resolve, reject] = [res, rej];
    });
    this.inFlightCommands.set(id, { resolve, reject });
    this.worker.postMessage({ method, params: args, id });
    return promise;
  }
}
