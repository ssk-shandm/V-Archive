<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        
        <n-layout position="absolute">
          
          <NavBar />

          <n-layout-content 
            content-style="min-height: calc(100vh - 4vh); display: flex; flex-direction: column; position: relative;"
            :native-scrollbar="false" 
          >
            
            <n-button
              v-if="showBackButton"
              strong
              secondary
              type="success"
              @click="router.back()"
              class="back"
            >
              < Back
            </n-button>

            <router-view v-slot="{ Component }">
              <keep-alive include="Search">
                <component :is="Component" />
              </keep-alive>
            </router-view>
            
          </n-layout-content>

        </n-layout>

      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const route = useRoute()

// 主页不留返回按钮
const showBackButton = computed(() => route.path !== '/')
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.back {
  font-size: 12px;
  position: absolute;
  left: 1vw;
  top: 1vh;
  z-index: 999; 
}
</style>