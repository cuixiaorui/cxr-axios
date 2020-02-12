// 主题
// axios
// 使用方式
// 1. 函数调用
// axios(config)

// 2. 对象方式调用
// axios.get(url)
// axios.post(url)

// TDD
// API
// 测试驱动开发
// 测试驱动学习

// 1. 先写失败的测试用例
// 2. 写代码让测试通过
// 3. 重构

// tasking
// axios({method,url})
// axios 是函数
// 接受一个参数 config
// 触发 http 请求
// 1. 浏览器坏境: ajax
// 2. node: http
// 返回一个promise 对象 ，对象包裹的值就是 http 请求过来的值

// tasking  对象调用
// axios.get(url) obj[key] = val(function)
// 触发 http 请求
// 1. 浏览器坏境: ajax
// 2. node: http
// 返回一个promise 对象 ，对象包裹的值就是 http 请求过来的值


// axios.create()

import axios from "../src/index";
jest.mock("../src/request.js", () => {
  return jest.fn().mockImplementation((method, url) => Promise.resolve(1));
});
import request from "../src/request";
import { GET,POST } from "../src/const";

const GET_URL = "./getData";
const POST_URL = "./update";

describe("axios", () => {
  describe("函数调用", () => {
    test("get 请求 ", async () => {
      const data = await axios({
        method: GET,
        url: GET_URL
      });
      expect(data).toBe(1);
      expect(request).toHaveBeenCalledWith(GET, GET_URL);
    });

    test("post 请求 ", async () => {
      const data = await axios({
        method: POST,
        url: POST_URL
      });
      expect(data).toBe(1);
      expect(request).toHaveBeenCalledWith(POST, POST_URL);
    });
  });

  describe("对象调用", () => {
    test("get 请求 ", async () => {
      const data = await axios.get(GET_URL);
      expect(data).toBe(1);
      expect(request).toHaveBeenCalledWith(GET, GET_URL);
    });

    test("post 请求 ", async () => {
      const data = await axios.post(POST_URL);
      expect(data).toBe(1);
      expect(request).toHaveBeenCalledWith(POST, POST_URL);
    });
  });
});
