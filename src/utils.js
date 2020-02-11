import { GET, POST, PUT, DELETE } from "./const";
export function extendsMethod(instance, axios) {
  [GET, POST, PUT, DELETE].forEach(method => {
    axios[method] = function(url) {
      const config = {
        method,
        url
      };
      return instance.request(config);
    };
  });
}
