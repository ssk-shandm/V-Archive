<template>
  <div class="container">
    <Transition name="slide-up">
      <div v-if="Ishow" class="homepage">
        <img src="../src/assets/VNDBArchive.png" alt="homepage" class="homepage-image" />
      </div>
    </Transition>
    <Transition name="slide-up">
      <div v-if="Tshow">
        <div class="content-wrapper">
          <div class="introduction">
            这是一个纯粹的 VNDB 搜索客户端。 我们利用 VNDB API 将庞大的数据库进行了结构化精简<br />
            相对于网页复杂的排版，V-Archive 专注于关键信息的提炼<br />
            查找评分、筛选标签还是阅览相关作，只有即搜即得的清爽体验
          </div>
          <router-link to="/search">
              <n-button strong secondary round type="success" class="button"> Let's GO! </n-button>
          </router-link>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const Ishow = ref(false)
const Tshow = ref(false)

onMounted(() => {
  Ishow.value = true

  setTimeout(() => {
    Tshow.value = true
  }, 200)
})
</script>

<style scoped>
.container {
  padding-top: 8vh;
  width: 100%;
}
.homepage {
  display: flex;
  justify-content: center;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
}
.homepage-image {
  width: 60%;
  height: auto;
}
.content-wrapper {
  display: flex;
  flex-direction: column; 
  align-items: center; 
}
.introduction {
  text-align: center;
  line-height: 1.8;
  border-radius: 8px;
  font-size: clamp(16px, 1.5vw, 25px);
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}
.button {
  margin-top: 5vh;
  width: 120px;
  height: 40px;
  font-size: clamp(16px, 1.2vw, 20px);
}

/* 动画过程时间 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 1s ease;
}

/* 进场开始状态 */
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* 进场结束状态 */
.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
