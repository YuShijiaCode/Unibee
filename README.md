# Unibee Automation Test Framework

这是一个面向 **Unibee** 的自动化测试仓库，目标是基于 **JavaScript + Mocha** 搭建一套统一的自动化测试框架，同时支持：

- UI 自动化测试
- API 自动化测试
- 测试数据与环境配置管理
- 持续集成场景下的自动执行与结果输出

## 项目目标

本项目用于为 Unibee 提供可维护、可扩展的自动化测试能力，帮助团队提升以下方面的质量保障效率：

- 核心业务流程回归验证
- 前端页面与交互行为校验
- 后端接口正确性校验
- 冒烟测试与回归测试执行
- 后续 CI/CD 流水线集成

## 技术栈规划

- Language: JavaScript
- Test Runner: Mocha
- Assertion: Chai
- UI Automation: Playwright 或 Puppeteer
- API Testing: Supertest / Axios
- Report: Mochawesome 或 Allure
- Env Management: `.env` / 配置文件

## 测试范围

### UI 自动化测试

UI 自动化测试将聚焦于 Unibee Web 管理后台或相关业务页面，包括但不限于：

- 登录与权限验证
- 订阅/套餐管理流程
- 支付流程相关页面操作
- 多阶段配置页面校验
- 表单输入、保存、状态切换与提示信息验证

### API 自动化测试

API 自动化测试将覆盖 Unibee 核心业务接口，包括但不限于：

- 鉴权与登录接口
- 用户、订阅、订单等核心业务接口
- 请求参数校验
- 响应状态码与返回结构校验
- 正向、异常与边界场景覆盖

## 推荐目录结构

```text
.
├── README.md
├── package.json
├── tests
│   ├── ui
│   └── api
├── configs
│   ├── test.env.js
│   └── env.example
├── utils
├── reports
└── artifacts
```

## 开发原则

- UI 与 API 测试分层管理，便于维护
- 测试数据与环境配置解耦
- 公共能力沉淀到 `utils` 中复用
- 输出清晰的执行日志、截图和测试报告
- 为后续 GitHub Actions / CI 集成预留标准化入口

## 后续计划

后续可以在本仓库中遐步补充以下内容：

- Mocha 基础执行框架
- UI 测试基础封装
- API 测试请求封装
- 测试报告集成
- GitHub Actions 自动执行工作流

## 说明

当前仓库作为 **Unibee 自动化测试框架** 的起点，后续将围绕 `JavaScript + Mocha` 持续完善，逐步形成同时支持 UI 与 API 自动化测试的完整测试工程。
