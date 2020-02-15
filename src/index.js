import request from "./request";
import { mixin } from "./utils";

const axios = createInstance();

axios.create = () => {
  return createInstance();
};

function createInstance() {
  const axios = config => {
    const { method, url } = config;
    return request(method, url);
  };

  mixin(axios, request);
  return axios;
}

export default axios;
