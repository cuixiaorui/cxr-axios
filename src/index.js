import request from "./request.js";
import { mixin } from "./utils.js";
import Axios from "./Axios"

const axios = createInstance();

axios.create = () => {
  return createInstance();
};

function createInstance(config) {

  const axios = new Axios(config)

  const obj = config => {
    const { method, url } = config;
    return axios.request(method, url);
  };


  obj.getConfig = () => {
    return axios.getConfig()
  }


  mixin(obj, axios.request.bind(axios));
  return obj;
}

export default axios;
