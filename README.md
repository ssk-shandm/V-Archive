# VNDB Searcher (Vue 3 + TypeScript)

基于 VNDB API v2 (Kana) 的纯粹搜索工具。暂不包含用户登录与列表管理功能。

## 🛠 技术栈
- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Network**: Fetch / Axios
- **API**: VNDB API v2 (Kana)

## 📅 开发计划 (Roadmap)

### Phase 1: 基础架构 & 搜索列表
- [ ] **项目初始化**: 配置 Vue3 + TS 环境。
- [ ] [cite_start]**API 封装**: 实现统一的 `POST` 请求处理 (Base URL: `https://api.vndb.org/kana`) [cite: 62, 192]。
- [ ] **搜索功能**:
    - [cite_start]输入关键词，构造 `filters: ["search", "=", "keyword"]` [cite: 343]。
    - 展示列表卡片 (封面、标题、发售日、评分、时长)。

### Phase 2: 详情展示 (基础 + 内容)
- [ ] **详情页/弹窗**:
    - [cite_start]展示 `description` (简介) [cite: 417]。
    - [cite_start]展示 `tags` (标签云，需过滤低权重标签) [cite: 441]。
    - [cite_start]展示 `developers` (开发商) [cite: 455]。
    - [cite_start]展示 `screenshots` (游戏截图) [cite: 425]。
- [ ] **UI 优化**:
    - [cite_start]**NSFW 处理**: 根据 `image.sexual` 和 `screenshots.sexual` > 0 进行高斯模糊 [cite: 397]。
    - [cite_start]**文本清洗**: 去除 `description` 中的格式代码 (如 `[b]`) [cite: 418]。

### Phase 3: 未来扩展 (Future)
- [ ] [cite_start]**角色信息**: 对接 `POST /character` 接口 [cite: 646]。
- [ ] **高级筛选**: 增加按标签、评分、时间筛选。

---

## 🔑 API 备忘录

### 1. 核心配置
- **Endpoint**: `https://api.vndb.org/kana/vn`
- [cite_start]**Method**: `POST` (所有查询均使用 POST) [cite: 192]
- **Headers**: `Content-Type: application/json`

### 2. 请求字段配置 (Fields)
[cite_start]直接复制用于 API 请求，包含列表与详情所需数据 [cite: 353-460]：

```typescript
const VN_FIELDS = [
  "id",
  "title",            // 罗马音标题
  "alttitle",         // 原文标题
  "released",         // 发售日
  "rating",           // 评分 (10-100)
  "length_minutes",   // 平均时长
  "description",      // 简介
  "image.url",        // 封面图
  "image.sexual",     // 封面分级 (0=safe, 1=suggestive, 2=explicit)
  "platforms",        // 平台 ["win", "ps4"]
  "languages",        // 语言 ["ja", "en"]
  "tags.name",        // 标签名
  "tags.rating",      // 标签关联度 (用于前端过滤 > 2.0)
  "developers.name",  // 开发商
  "screenshots.url",  // 截图链接
  "screenshots.thumbnail",
  "screenshots.sexual" // 截图分级
].join(", ");