const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const asyncOnMessageWrap = (fn) => {
  return async (msg) => {
    postMessage(await fn(msg.data));
  }
}

const commands = {
  squareMax: async (max) => {
    await sleep(Math.random() * 100);
    let sum = 0;
    for (let i = 0; i < max; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  },
  fibonacci: async (limit) => {
    await sleep(Math.random() * 100);
    let prev = 1n, next = 0n, swap;
    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }
    return String(next);
  },
  bad: async () => {
    await sleep(Math.random() * 100);
    throw new Error("Something went wrong");
  }
}

self.onmessage = asyncOnMessageWrap(async (rpc) => {
  const { method, params, id } = rpc;

  if (commands.hasOwnProperty(method)) {
    try {
      const result = await commands[method](...params);
      return { id, result };
    } catch (e) {
      return { id, error: { code: -32000, message: e.message }};
    }
  } else {
    return {
      id, error: {
        code: -32601,
        message: `method ${method} does not exist`,
      }
    }
  }
})
