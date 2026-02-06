<template>
  <Waterfall
    ref="waterfallInnerRef"
    :list="list"
    :width="300"
    :gutter="12"
    :breakpoints="{
      1200: { rowPerView: 4 },
      800: { rowPerView: 3 },
      500: { rowPerView: 2 }
    }"
  >
    <template #item="{ item }">
      <slot name="item" :item="item"></slot>
    </template>
  </Waterfall>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

defineProps<{
  list: any[]
}>()

const waterfallInnerRef = ref<any>(null)

// 暴露 renderer 方法
defineExpose({
  renderer: () => waterfallInnerRef.value?.renderer()
})
</script>