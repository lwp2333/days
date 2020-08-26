<template>
  <div class="container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了呀" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" @click="handleDetail(item)" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  components: {},
  data: function() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created: function() {},
  computed: {},
  methods: {
    onLoad: function() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.$myLoading.show()
      setTimeout(() => {
        const arr = [...new Array(16).keys()]
        arr.map(item => {
          this.list.push(`博客${this.list.length + 1}`)
        })
        // 加载状态结束
        this.loading = false
        this.$myLoading.hide()

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    handleDetail: function(item) {
      this.$router.push({ path: '/blog/detail', query: { title: item } })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 12.54vw;
}
</style>
