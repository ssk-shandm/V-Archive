<template>
  <div class="container">

    <div class="GameContent">
      <GD v-if="gameInfo" :info="gameInfo" />

      <n-alert v-else-if="NODATA" title="Error" type="error" style="margin-top: 20px">
        没有获取到数据
      </n-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchData, type VGame } from '../src/api/vndb'
import GD from '../components/GameDetails.vue'

const route = useRoute()
const gameInfo = ref<VGame | null>(null)
const NODATA = ref(false)

// 根据 ID 从 API 中获取数据
const fetchGameData = async (id: string) => {
  try {
    const query = {
      filters: ['id', '=', id],
      fields:
        'title, released, rating, image.url, image.sexual, description, developers.name, languages, relations.id, relations.relation, relations.title, relations.relation_official, relations.image.url'
    }
    const res = await searchData(query)
    if (res.results.length > 0) {
      gameInfo.value = res.results[0]
      NODATA.value = false
    } else {
      NODATA.value = true
    }
  } catch (error) {
    console.error(error)
    NODATA.value = true
  }
}

onMounted(() => {
  // 获取 state 中的游戏数据
  const GameData = history.state.gameData as VGame

  if (GameData && GameData.description) {
    gameInfo.value = GameData
  } else {
    NODATA.value = true
  }
})

// 监听 ID 变化
watch(
  () => route.params.id,
  newId => {
    if (newId) {
      gameInfo.value = null
      fetchGameData(newId as string)
    }
  }
)
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  padding: 5vh 2vw 0 2vw;

  box-sizing: border-box;
}

.GameContent {
  width: 100%;
}
</style>
