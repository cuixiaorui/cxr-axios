export default class InterceptorManager {
  constructor() {
    this.queue = [];
  }

  use(fn) {
    this.queue.push(fn);
  }
  getLength() {
    return this.queue.length;
  }
  clearAll() {
    this.queue = [];
  }

  execute(config){
      let input = config;
      this.queue.forEach(fn => {
          const output = fn(input)
          input = output;
      });
  }
}
