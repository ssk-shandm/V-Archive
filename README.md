# VNDB-Archive
> 这是一个基于 [VNDB API v2 (Kana)](https://api.vndb.org/kana) 构建的**纯粹**搜索客户端。
> 相比于网页版复杂的排版，VNDB-Archive 专注于关键信息的提炼：封面、评分、标签、相关作。即搜即得。

## 🛠 技术栈

本项目采用 **Tauri 2.0** + **Vue 3** 全新生态构建：

- **核心框架:** [Tauri v2](https://v2.tauri.app/) (Rust + WebView)
- **前端:** Vue 3 (组合式API) + TypeScript
- **构建工具:** Vite 6
- **UI组件库:** [Naive UI](https://www.naiveui.com/)
- **网络请求:** 原生 Fetch API
- **路由:** Vue Router 4

## ✨ 特色

目前已实现的特性 (v0.1.0)：

- [x] **极速搜索**: 基于关键字的 VNDB 实时检索，瀑布流布局。
- [x] **沉浸详情**: 自动清洗 BBCode 简介，提取开发商、发售日及评分信息。
- [x] **标签系统**: 自动过滤低权重标签，按关联度降序排列，一眼看清游戏属性。
- [x] **关联检索**: 自动展示前作、续作、FanDisc 等相关游戏，支持点击跳转。
- [x] **隐私保护 (NSFW)**: 
    - 默认开启敏感内容模糊处理。
    - 封面与详情页图片均支持点击解禁/复原。
- [x] **个性化**: 
    - 支持自定义本地图片作为背景。
    - 可调节背景透明度以适配不同壁纸。

## 🚀 如何开始

### 条件

- Node.js (v18+)
- Rust (用于编译 Tauri 后端)

### 运行步骤

```bash
# 1. Clone repo
git clone [https://github.com/your-name/v-archive.git](https://github.com/your-name/v-archive.git)

# 2. Install dependencies
npm install

# 3. Run in browser (UI only)
npm run dev

# 4. Run Desktop App (Tauri)
npm run tauri dev