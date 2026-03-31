# Unibee Automation Test Framework

这是一个面向 **Unibee** 的自动化测试框架，基于 **JavaScript + Mocha** 构建，同时支持：

- Web UI 自动化测试
- API 自动化测试
- Page Object 分层管理
- 测试数据分离管理
- 公共能力统一封装

## 技术栈

- Language: JavaScript
- Test Runner: Mocha
- Web UI: Selenium WebDriver
- API: Axios

## 目录结构

```text
.
├── API
│   ├── TestCases
│   │   └── auth.spec.js
│   └── TestData
│       └── loginPayload.json
├── Common
│   ├── API
│   │   ├── apiClient.js
│   │   └── unibeeApi.js
│   ├── Web
│   │   ├── basePage.js
│   │   └── webDriver.js
│   ├── config.js
│   └── testDataLoader.js
├── Web
│   ├── PageObject
│   │   └── LoginPage.js
│   ├── report
│   ├── TestCases
│   │   └── login.spec.js
│   └── TestData
│       └── loginData.json
├── mocha.api.setup.js
├── mocha.web.setup.js
└── package.json
```

## 设计说明

### Web 自动化

- `Web/PageObject` 用于维护页面对象
- `Web/TestCases` 用于维护 UI 测试用例
- `Web/TestData` 用于管理页面测试数据
- `Web/report` 用于保存测试报告

### API 自动化

- `API/TestCases` 用于维护 API 测试用例
- `API/TestData` 用于管理 API 测试数据

### Common 公共层

- `Common/API` 用于封装 API 请求方法
- `Common/Web` 用于封装 WebDriver 和页面基础能力
- `Common/config.js` 用于集中管理基础配置
- `Common/testDataLoader.js` 用于统一读取测试数据

## 已提供的基础能力

- Selenium WebDriver 工厂封装
- BasePage 页面基类封装
- Axios API Client 封装
- Unibee API 示例封装
- Web 登录示例用例
- API 登录示例用例

## 环境变量

可通过环境变量覆盖默认配置：

- `WEB_BASE_URL`
- `WEB_TARGET_PATH`
- `WEB_USERNAME`
- `WEB_PASSWORD`
- `API_BASE_URL`
- `API_USERNAME`
- `API_PASSWORD`
- `BROWSER`
- `SELENIUM_SERVER_URL`
- `UI_WAIT_TIMEOUT`
- `API_TIMEOUT`

## 安装依赖

```bash
npm install
```

## 执行测试

运行全部测试：

```bash
npm test
```

运行 Web UI 自动化测试：

```bash
npm run test:web
```

当前默认的 Web 示例用例已经按 Unibee 商户站点登录场景配置：

- Base URL: `https://merchant.unibee.top/`
- Target Path: `plan/new?productId=0&tab=advanced`

运行 API 自动化测试：

```bash
npm run test:api
```

## 后续扩展建议

- 补充更多 Page Object 页面对象
- 为 Unibee 核心业务接口增加 API 封装
- 增加登录态管理、截图、日志和失败重试机制
- 引入更完整的测试报告能力
- 对接 CI/CD 流水线执行自动化测试
