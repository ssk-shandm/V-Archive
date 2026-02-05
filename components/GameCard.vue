<template>
  <n-card :title="info.title" hoverable class="game-card">
    <template #cover>
      <div>
        <img v-if="info.image" :src="info.image.url" loading="lazy" />
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import type { VGame } from '../src/api/vndb'

defineProps<{ info: VGame }>()
</script>

<style scoped>
.game-card {
  width: 80%;
  height: auto;
}
</style>
