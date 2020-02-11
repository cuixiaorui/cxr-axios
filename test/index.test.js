// tasking

// 使用方式
// 1. 可以通过函数的方式调用
// axios(config);
// 2. 可以通过对象.[method] 的方式来使用
// axios.get(url[,config]);


// axios.create(); 的实现

// 配置问题
// 1. 全局配置 // defaults
// axios.defaults.baseURL = ""
// 2. 通过 axios.create(config) 创建出来的可自定义配置

// 拦截器的实现
// axios.interceptors.request; // 请求
// axios.interceptors.response; // 响应

import axios from "../src/index.js";
import { send } from "../src/request.js";
import { GET, POST, PUT, DELETE } from "../src/const";

const GET_URL = "localhost:3001/getData";
const POST_URL = "localhost:3001/update";
jest.mock("../src/request", () => {
  return {
    send: jest.fn().mockImplementation(config => Promise.resolve(1))
  };
});

describe("axios", () => {
  beforeEach(() => {
    send.mockClear();
  });

  const getGetConfig = () => ({ method: GET, url: GET_URL });
  const getPostConfig = () => ({ method: POST, url: POST_URL });

  describe("函数调用", () => {
    test("函数调用 get 请求", async () => {
      const result = await axios(getGetConfig());
      expect(result).toBe(1);
      expect(send).toHaveBeenCalledWith(getGetConfig());
    });

    test("函数调用 post 请求", async () => {
      const result = await axios(getPostConfig());
      expect(result).toBe(1);
      expect(send).toHaveBeenCalledWith(getPostConfig());
    });

    test("默认使用 get 请求", async () => {
      const result = await axios({ url: GET_URL });
      expect(result).toBe(1);
      expect(send).toHaveBeenCalledWith(getGetConfig());
    });
  });

  describe("对象形式调用", () => {
    test("get 请求", async () => {
      const result = await axios.get(GET_URL);
      expect(result).toBe(1);
      expect(send).toHaveBeenCalledWith(getGetConfig());
    });

    test("post 请求", async () => {
      const result = await axios.post(POST_URL);
      expect(result).toBe(1);
      expect(send).toHaveBeenCalledWith(getPostConfig());
    });
  });

  describe("别名", () => {
    test("axios 上应该有 get、post、put、delete 方法", () => {
      ["get", "post", "put", "delete"].forEach(method => {
        expect(axios[method]).toBeTruthy();
        const isFunction = obj => typeof obj === "function";
        expect(isFunction(axios[method])).toBeTruthy();
      });
    });
  });

  describe("可以使用自定义配置新建一个 axios 实例", () => {
    let instance;
    const config = {};
    beforeEach(() => {
      instance = axios.create(config);
    });

    describe("对象调用", () => {
      test("get 请求", async () => {
        const result = await instance.get(GET_URL);
        expect(result).toBe(1);
        expect(send).toHaveBeenCalledWith(getGetConfig());
      });
    });

    describe("函数调用", () => {
      test("get 请求", async () => {
        const result = await instance(getGetConfig());
        expect(result).toBe(1);
        expect(send).toHaveBeenCalledWith(getGetConfig());
      });
    });
  });

  describe("拦截器", () => {
    // tasking
    // 1. 使用 use 添加拦截器函数
    // 2. 执行顺序是
    // (请求拦截(config) -> config)
    // (请求(config) => response)
    // (响应拦截(response) => response)
    // 用户代码.then(response)
    beforeEach(() => {
      axios.interceptors.request.clearAll();
    });

    test("使用 request.use 添加请求拦截器", () => {
      const interceptor1 = () => {};

      axios.interceptors.request.use(interceptor1);
      expect(axios.interceptors.request.getLength()).toBe(1);

      const interceptor2 = () => {};
      axios.interceptors.request.use(interceptor2);

      expect(axios.interceptors.request.getLength()).toBe(2);
    });

    test("应该在请求之前按照添加的顺序调用对应的请求拦截器 ", async () => {
      const orderList = [];
      const interceptor1 = config => {
        config.name = "1";
        orderList.push("1");
        return config;
      };
      axios.interceptors.request.use(interceptor1);

      const interceptor2 = config => {
        config.age = 18;
        orderList.push("2");
        return config;
      };
      axios.interceptors.request.use(interceptor2);

      // when
      await axios(getGetConfig());

      // then
      expect(orderList).toEqual(["1", "2"]);
      expect(orderList).toEqual(["1", "2"]);
      expect(send).toBeCalledWith({
        name: "1",
        age: 18,
        ...getGetConfig()
      });
    });
  });
});
