let BASE_URL = "";
let BASE_NAME = "";
const TIME_OUT = 10000;

// 开发环境 development
// 生产环境 production
// 测试环境 test
if (process.env.NODE_ENV === "development") {
  // BASE_URL = "https://www.minliankeji.com/api/supervision/";
  BASE_URL = "https://test.minliankeji.com/api/supervision/";
  // BASE_URL = "http://192.168.0.104:5000/api/supervision/";
  BASE_NAME = "";
} else if (process.env.NODE_ENV === "production") {
  // BASE_URL = "https://www.minliankeji.com/api/supervision/";
  BASE_URL = "https://test.minliankeji.com/api/supervision/";
  BASE_NAME = "";
} else {
  BASE_URL = "https://test.minliankeji.com/api/supervision/";
  BASE_NAME = "";
}

export { BASE_NAME, BASE_URL, TIME_OUT };
