<template>
  <div class="container">
    <n-space vertical size="large">

      <div class="input-wrapper" :class="{ 'center-mode': Centered }">
        <n-input
          v-model:value="keyword"
          @keydown.enter="handleEnter"
          size="large"
          round
          placeholder="搜索..."
          class="search-input"
        />
      </div>

      <n-spin :show="loading">
        <div class="container-card">
          <GameWaterfall
            ref="waterfallRef"
            v-if="GList.length > 0"
            :list="GList"
          >
            <template #item="{ item }">
              <GameCard :info="item" />
            </template>
          </GameWaterfall>

          <n-result
            v-else-if="Searched"
            status="404"
            title="啥也没有啊。。"
            style="margin-top: 50px"
          >
          </n-result>
        </div>
      </n-spin>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onActivated } from 'vue'
import GameWaterfall from '../components/GameWaterfall.vue'
import { searchData, type VGame } from '../src/api/vndb'
import GameCard from '../components/GameCard.vue'

defineOptions({
  name: 'Search'
})

const GList = ref<VGame[]>([])
const loading = ref(false)
const Centered = ref(true)
const Searched = ref(false)
const keyword = ref('')
const waterfallRef = ref<any>(null)

// 刷新瀑布流布局
onActivated(() => {
  if (waterfallRef.value && GList.value.length > 0) {
    nextTick(() => {
      waterfallRef.value.renderer?.()
    })
  }
})

const handleEnter = async () => {
  if (!keyword.value.trim()) return

  Centered.value = false
  loading.value = true
  Searched.value = false

  try {
    const query = {
      filters: ['search', '=', keyword.value],
      fields:
        'title, released, rating, image.url, image.sexual, description, developers.name, languages, relations.id, relations.relation, relations.title, relations.relation_official, relations.image.url'
    }
    const response = await searchData(query)
    GList.value = response.results
    
    if (GList.value.length === 0) {
      Searched.value = true
    }
    
    // 数据更新后，等待 DOM 渲染完，刷新瀑布流
    nextTick(() => {
      if (waterfallRef.value) {
        waterfallRef.value.renderer?.()
      }
    })

  } catch (error) {
    console.error('error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  position: relative;
  padding: 5vh 5vw 0 5vw;
}
.container-card {
  margin-top: 20px;
  position: relative;
  z-index: 1; 
}

.input-wrapper {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateY(0);
  width: 100%;
  position: relative;
  z-index: 100;
}

.center-mode {
  transform: translateY(35vh);
}

.search-input {
  background-color: #f2f3f5;
  border: 1px solid transparent;
}

.search-input:focus-within {
  background-color: #fff;
  transition: background-color 0.3s;
}
</style>