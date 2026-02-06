<template>
  <div class="details-container">
    <n-grid y-gap="100" cols="1" responsive="screen">
      <!-- 上半部分 -->
      <n-grid-item>
        <n-grid x-gap="12" y-gap="24" cols="1 m:2" responsive="screen">
          <n-grid-item>
            <!-- 图片 -->
            <div class="image-wrapper">
              <img v-if="info.image" :src="info.image.url" class="game-image" alt="Cover" />
            </div>
          </n-grid-item>
          <n-grid-item>
            <n-space vertical size="large">
              <!-- 游戏基本信息 -->
              <div>
                <h1 class="title">{{ info.title }}</h1>
                <div class="meta-tags">
                  <n-tag type="primary" bordered> ID: {{ info.id }} </n-tag>
                  <n-tag type="success" bordered v-if="info.released">
                    发售: {{ info.released }}
                  </n-tag>
                  <n-tag type="warning" bordered v-if="info.rating">
                    评分: {{ info.rating }}
                  </n-tag>
                  <n-tag type="info" bordered v-if="info.languages">
                    语言: {{ formatLanguages(info.languages) }}
                  </n-tag>
                </div>
              </div>
              <div v-if="info.developers && info.developers.length">
                <h3 class="section-title">开发商</h3>
                <n-space>
                  <n-tag
                    v-for="(dev, index) in info.developers"
                    :key="index"
                    size="small"
                    secondary
                  >
                    {{ dev.name || 'Unknown' }}
                  </n-tag>
                </n-space>
              </div>
              <div v-if="info.description">
                <h3 class="section-title">简介</h3>
                <div class="description-text">
                  {{ realDescription(info.description) }}
                </div>
              </div>
            </n-space>
          </n-grid-item>
        </n-grid>
      </n-grid-item>

      <!-- 下半部分 -->
      <n-grid-item v-if="info.relations && info.relations.length">
        <h3 class="section-title">相关游戏</h3>
        <GameWaterfall :list="info.relations">
          <template #item="{ item }">
            <GameCard :info="item" :tag="relationMap[item.relation] || item.relation" />
          </template>
        </GameWaterfall>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import type { VGame } from '../src/api/vndb'
import GameCard from './GameCard.vue'
import GameWaterfall from './GameWaterfall.vue'

defineProps<{ info: VGame }>()

// 简介数据清洗
const realDescription = (text: string) => {
  if (!text) return ''
  return text
    .replace(/\[\/?[bi]\]/g, '')
    .replace(/\[url=[^\]]+\](.*?)\[\/url\]/g, '$1')
    .replace(/\[\/?(?:spoiler|quote)[^\]]*\]/g, '')
}

// 语言代码映射表
const langMap: Record<string, string> = {
  ja: '日语',
  en: '英语',
  'zh-Hans': '简中',
  'zh-Hant': '繁中',
  zh: '中文',
  ko: '韩语',
  ru: '俄语',
  fr: '法语',
  de: '德语',
  es: '西班牙语',
  it: '意大利语',
  pt: '葡萄牙语',
  'pt-br': '巴西葡语',
  vi: '越南语',
  pl: '波兰语',
  tr: '土耳其语',
  uk: '乌克兰语',
  id: '印尼语',
  th: '泰语',
  ar: '阿拉伯语'
}

// 关联类型映射表
const relationMap: Record<string, string> = {
  seq: '续作',
  preq: '前作',
  fan: 'FanDisc',
  set: '同设定',
  char: '同角色',
  side: '外传',
  par: '主线',
  ser: '同系列',
  alt: '不同版本'
}

// 语言数组格式化
const formatLanguages = (codes: string[]) => {
  if (!codes) return ''
  return codes.map(code => langMap[code] || code).join(', ')
}
</script>

<style scoped>
.details-container {
  padding: 20px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.game-image {
  width: 100%;
  max-width: 30vw;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  object-fit: cover;
}

.title {
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  font-weight: bold;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.meta-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  border-left: 4px solid #18a058;
  padding-left: 8px;
}

.description-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  white-space: pre-wrap;
}
</style>
