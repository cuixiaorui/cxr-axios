import request from "./request";
import { GET, POST } from "./const";
const axios = config => {
  const { method, url } = config;
  return request(method, url);
};

[GET, POST].forEach(method => {
  axios[method] = url => {
    return request(method, url);
  };
});

export default axios;
