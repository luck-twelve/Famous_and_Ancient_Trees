# Famous and Ancient Trees

**中文** | [English](./README.md)

> vue3-admin-plus 提供企业级的开发 demo

本架构使用的技术为：vue3(setup-script)+vite2+element-plus 的新一代的前端框架，It's fast!

使用 eslint+prettier+gitHooks 格式和校验代码,提高代码规范性和开发效率

使用最先进的包管理工具 pnpm

vue3 和 vue2 在性能上的对比

- 打包大小减少 41%

- 初次渲染快 55%, 更新渲染快 133%

- 内存减少 54%

- **使用 Proxy 代替 defineProperty 实现数据响应式**

- **重写虚拟 DOM 的实现和 Tree-Shaking**

## 构建步骤

```bash
# pnpm address https://pnpm.io/zh/motivation
# 安装依赖(建议用pnpm)
# 你可以使用 "npm -g i pnpm" 去安装pnpm
pnpm i / npm i

# 启动服务
pnpm run dev / npm run dev
```

浏览器访问 http://localhost:5001

## 发布

```bash
# 构建测试环境
pnpm run build-serve / npm run build-serve

# 构建生产环境
pnpm run build / npm run build
```

## 其它

```bash
# 预览发布环境效果
pnpm run preview:build-serve / npm run preview:build-serve

# 预览生产环境
pnpm run preview / npm run preview

# 代码格式检查并自动修复
pnpm run lint / npm run lint
```

## 浏览器支持

注意：vue3 不在支持 IE 浏览器
Modern browsers and Internet Explorer 11+.

## git 代码提交规范

feat 增加新功能
fix 修复问题/BUG
style 代码风格相关无影响运行结果的
perf 优化/性能提升
refactor 重构
revert 撤销修改
test 测试相关
docs 文档/注释
chore 依赖更新/脚手架配置修改等
workflow 工作流改进
ci 持续集成
types 类型定义文件更改
wip 开发中
