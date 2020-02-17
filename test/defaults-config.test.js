import axios from "../src/index";

describe("defaults-config", () => {
  test("可以获取到 config 对象", () => {
    const config = axios.getConfig();
    const isObject = obj => typeof obj === "object";
    expect(isObject(config)).toBe(true);
  });

  // 应该用个循环来把所有的配置文件的默认值都 expect 掉
  test("baseURL 默认值为 “”", () => {
    const config = axios.getConfig();
    expect(config.baseURL).toBe("");
  });
});
