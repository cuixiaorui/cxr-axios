import request from "./request.js";
export default class Axios {
  constructor(config = {}) {
    this.defaultConfig = this.mergeConfig(defaultConfig, config);
  }

  mergeConfig(sourceConfig, config) {
    return Object.assign({}, sourceConfig, config);
  }

  request(config) {
    const newConfig = this.mergeConfig(this.defaultConfig, config);
    const { method, url, baseURL } = newConfig;
    return request(method, baseURL + url);
  }

  getConfig() {
    return this.defaultConfig;
  }
}

const defaultConfig = {
  baseURL: ""
};
