// 使用方式
// 函数调用
// axios({config})

// 对象调用
// axios.get(url)

// 创建一个实例
// axios.create()

// TDD
// 1. 2 .3

// 函数调用
// axios({config})
// tasking
// 1. axios 就是一个函数
// 2. 接受一个 config 对象
//  - method  告诉它怎么个人方式请求
//  - url     地址
// 3. http 请求
//  - 浏览器坏境 ajax
//  - nodejs http

// 4. 返回一个 promise.then()
//    async await

// jest

// 如何保持整洁的代码
// - 写测试 - request
// - 表达力
// - 不要有重复

// 想象自己有两顶帽子
// 1. 实现代码的帽子
// 2. 重构的帽子

// 对象调用
// axios.get(url)
// tasking
// js 万物皆对象
// obj[key] = val
// key : get  val : function
// 1. 给 axios 添加 get 方法
// 2. 给 url 参数
// 3. http 请求
// 4. 返回一个 promise

// 加一个运行使用
// 加集成测试

import axios from "../src/index";
jest.mock("../src/request.js", () => {
  return jest.fn().mockImplementation((method, url) => Promise.resolve(1));
});
import request from "../src/request";
import { GET, POST } from "../src/const";

const GET_URL = "/getData";
const POST_URL = "/update";

describe("axios", () => {
  describe("函数调用", () => {
    test("get 请求", async () => {
      expectGetByFunctionCalled(axios);
    });
    test("post 请求", async () => {
      const data = await axios({
        method: POST,
        url: POST_URL
      });
      expect(data).toBe(1);
      expect(request).toBeCalledWith(POST, POST_URL);
    });
  });

  describe("对象调用", () => {
    test("get 请求", async () => {
      const data = await axios.get(GET_URL);
      expect(data).toBe(1);
    });
    test("post 请求", async () => {
      const data = await axios.post(POST_URL);
      expect(data).toBe(1);
    });
  });

  describe("axios.create()", () => {
    // 新创建一个实例
    let instance;
    beforeEach(() => {
      instance = axios.create();
    });
    describe("函数调用", () => {
      test("get 请求", async () => {
        expectGetByFunctionCalled(instance);
      });
    });

    describe("对象调用", () => {
      test("get 请求", async () => {
        const data = await instance.get(GET_URL);
        expect(data).toBe(1);
      });
    });
  });

  describe("配置文件", () => {
    describe("设置全局的配置文件", () => {
      test("设置全局请求的 baseURL", async () => {
        // 设置全局的 baseURL
        const config = axios.getConfig();
        config.baseURL = "nihao/";

        const data = await axios({
          method: GET,
          url: GET_URL
        });
        expect(data).toBe(1);
        const apiPath = "nihao/" + GET_URL;
        expect(request).toBeCalledWith(GET, apiPath);
      });
    });
    describe("请求级别的配置文件", () => {
      test("设置请求的 baseURL", async () => {
        const data = await axios({
          method: GET,
          url: GET_URL,
          baseURL: "heiheihei/"
        });
        expect(data).toBe(1);
        const apiPath = "heiheihei/" + GET_URL;
        expect(request).toBeCalledWith(GET, apiPath);
      });
    });

    describe("设置局部的 config 文件的优先级要大于 全局设置的 config", () => {
      test("设置全局的 baseURL 为 nihao ， 设置局部的 baseURL 为 heiheihei， 最后的 baseURL 应该为 heiheihei", async () => {
        const config = axios.getConfig();
        config.baseURL = "nihao/";

        const data = await axios({
          method: GET,
          url: GET_URL,
          baseURL: "heiheihei/"
        });
        expect(data).toBe(1);
        const apiPath = "heiheihei/" + GET_URL;
        expect(request).toBeCalledWith(GET, apiPath);
      });
    });
  });
});

async function expectGetByFunctionCalled(axios) {
  const data = await axios({
    method: GET,
    url: GET_URL
  });
  expect(data).toBe(1);
  expect(request).toBeCalledWith(GET, GET_URL);
}
