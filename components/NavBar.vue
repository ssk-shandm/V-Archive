<template>
  <n-layout-header bordered class="nav-bar">
    <div class="nav-wrapper">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" class="nav-menu" />
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { h, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NIcon,type MenuOption } from 'naive-ui'
import { SettingOne } from '@icon-park/vue-next'

// 渲染图标函数
function renderIcon(icon: any, props: any = {}) {
  const iconProps = {
    theme: 'outline',
    fill: '#333',
    ...props
  }

  return () => h(NIcon, null, { default: () => h(icon, iconProps) })
}

// 定义菜单项
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/setting' }, { default: () => '设置' }),
    key: 'setting',
    icon: renderIcon(SettingOne, {
      theme: 'outline',
      fill: '#333'
    })
  }
]

const route = useRoute()
const activeKey = ref<string | null>(null)

// 监听路由变化，高亮对应的菜单项
watch(
  () => route.path,
  path => {
    if (path.startsWith('/setting')) activeKey.value = 'setting'
    else activeKey.value = null
  },
  { immediate: true }
)
</script>

<style scoped>
.nav-bar {
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(191, 191, 191, 0.359);
  backdrop-filter: blur(10px);
}

.nav-wrapper {
  width: 100%;
  max-width: 114514px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-menu {
  flex: 1;
  justify-content: flex-end;
}
</style>
