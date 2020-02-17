
import { GET, POST } from "./const.js";

export function mixin(obj, fn) {
  [GET, POST].forEach(method => {
    obj[method] = url => {
      return fn(method, url);
    };
  });
}