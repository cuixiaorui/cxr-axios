import { mergeConfig } from "./config";
import { send } from "./request.js";
export default class Axios {
  constructor(config) {
    this.defaultConfig = config;
  }

  request(config) {
    config = mergeConfig(this.defaultConfig, config);

    return new Promise((resolve, reject) => {
      send(config).then(data => {
        resolve(data);
      });
    });
  }
}
