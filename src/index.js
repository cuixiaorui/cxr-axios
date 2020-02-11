import { defaultConfig } from "./config";
import Axios from "./Axios";
import { extendsMethod } from "./utils";
import InterceptorManager from "./InterceptorManager";

const instance = createInstance(defaultConfig);

instance.create = function(defaultConfig) {
  return createInstance(defaultConfig);
};

function createInstance(defaultConfig) {
  const instance = new Axios(defaultConfig);
  const axios = async function(config) {
    // 触发所有的请求拦截器
    executeRequestInterceptors(axios, config);
    return instance.request(config);
    // const response = await instance.request(config);
    // const result = executeResponseInterceptors(axios, response);
    // return Promise.resolve(result);
  };
  extendsMethod(instance, axios);
  addInterceptors(axios);

  return axios;
}

function addInterceptors(axios) {
  axios.interceptors = {
    request: new InterceptorManager()
  };
}

function executeResponseInterceptors(){
    
}

function executeRequestInterceptors(axios, config) {
  axios.interceptors.request.execute(config);
}

export default instance;
