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
    return axios.request(config);
  };


  obj.getConfig = () => {
    return axios.getConfig()
  }


  mixin(obj, axios.request.bind(axios));
  return obj;
}

export default axios;
