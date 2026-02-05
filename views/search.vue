<template>
  <div class="container">
    <n-space vertical size="large">
      <n-button
        strong
        secondary
        type="success"
        @click="router.back()"
        style="font-size: 12px; position: absolute; left: 1vw; top: 1vh"
      >
        ← Back
      </n-button>

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
          <n-grid
            v-if="GList.length > 0"
            :x-gap="12"
            :y-gap="12"
            cols="s:2 m:3 l:4"
            responsive="screen"
          >
            <n-grid-item v-for="item in GList" :key="item.id">
              <GameCard :info="item" />
            </n-grid-item>
          </n-grid>

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { searchData, type VGame } from '../src/api/vndb'
import GameCard from '../components/GameCard.vue'

const router = useRouter()
const GList = ref<VGame[]>([])
const loading = ref(false)

const Centered = ref(true)
const Searched = ref(false)

const keyword = ref('')

const handleEnter = async () => {
  if (!keyword.value.trim()) return

  Centered.value = false
  loading.value = true
  GList.value = []
  Searched.value = false

  // 依据关键词发送请求搜索
  try {
    const query = {
      filters: ['search', '=', keyword.value],
      fields: 'title, released, rating, image.url, image.sexual'
    }
    const response = await searchData(query)
    GList.value = response.results
  } catch (error) {
    console.error('error:', error)
  } finally {
    loading.value = false
  }

  if (GList.value.length === 0) {
    Searched.value = true
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
}

.input-wrapper {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateY(0);
  width: 100%;
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
