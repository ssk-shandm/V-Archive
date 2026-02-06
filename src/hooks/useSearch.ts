import { ref, nextTick, onActivated } from 'vue'
import { searchData, type VGame } from '../api/vndb'

export function useSearch() {
  const GList = ref<VGame[]>([])
  const loading = ref(false)
  const Centered = ref(true)
  const Searched = ref(false)
  const keyword = ref('')

  // 拿到瀑布流组件的实例
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

  return {
    GList,
    loading,
    Centered,
    Searched,
    keyword,
    waterfallRef,
    handleEnter
  }
}