import axios from "../src/index";

describe("defaults-config", () => {
  test("可以获取到 config 对象", () => {
    const config = axios.getConfig();
    const isObject = obj => typeof obj === "object";
    expect(isObject(config)).toBe(true);
  });

  test("设置 config 对象的 baseURL 字段", () => {
    const config = axios.getConfig();
    config.baseURL = "nihao"
    expect(axios.getConfig().baseURL).toBe("nihao")
  });
  
});
