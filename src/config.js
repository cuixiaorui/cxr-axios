
import { GET, POST, PUT, DELETE } from "./const";
export const defaultConfig = {
  method: GET
};

export const mergeConfig = (defaultConfig, config) => {
  return Object.assign({}, defaultConfig, config);
};

