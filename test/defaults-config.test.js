import axios from "../src/index";

describe("defaults-config", () => {
  test("可以获取到 config 对象", () => {
    const config = axios.getConfig();
    expect(config).toEqual({});
  });
});
