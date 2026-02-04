# VNDB Searcher (Vue 3 + TypeScript)

基于 VNDB API v2 (Kana) 的纯粹搜索工具。

## 🛠 技术栈
- **Core**: Vue 3 (Composition API) + TypeScript
- **Network**: Fetch / Axios
- **API**: VNDB API v2 (Kana)

## 📅 开发计划 (Roadmap)

### Phase 1: 基础架构 & 搜索
- [ ] **初始化**: Vue 3 + TS 环境搭建。
- [ ] **API 封装**: 统一 `POST` 请求处理 (Base: `https://api.vndb.org/kana`)。
- [ ] **搜索实现**:
    - 构造过滤器 `filters: ["search", "=", "keyword"]`。
    - 开发列表卡片 (封面/标题/评分/发售日)。

### Phase 2: 详情 & 体验优化
- [ ] **详情页展示**: 简介、标签云 (过滤低权重)、开发商、截图。
- [ ] **UI/UX 优化**:
    - **NSFW 处理**: 根据 `sexual` 字段 > 0 实施高斯模糊。
    - **文本清洗**: 移除简介中的格式代码 (如 `[b]`)。

### Phase 3: 扩展功能
- [ ] **角色信息**: 对接 `POST /character` 接口。
- [ ] **高级筛选**: 支持按标签、评分、日期组合筛选。

---

## 🔑 API 备忘录

### 1. 核心配置
- **Endpoint**: `https://api.vndb.org/kana/vn`
- **Method**: `POST` (必须)
- **Content-Type**: `application/json`

### 2. 请求字段 (Fields)
列表与详情页通用的字段配置：

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
  "tags.rating",      // 标签关联度 (建议前端过滤 > 2.0)
  "developers.name",  // 开发商
  "screenshots.url",  // 截图链接
  "screenshots.thumbnail",
  "screenshots.sexual" // 截图分级
].join(", ");
