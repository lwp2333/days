<template>
  <div class="tabbar">
    <van-tabbar v-model="active" @change="tabChange">
      <van-tabbar-item name="/user" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="/amap" icon="location-o">地图</van-tabbar-item>
      <van-tabbar-item name="/icon" icon="smile-comment-o">图标</van-tabbar-item>
      <van-tabbar-item name="/blog" icon="friends-o">博客</van-tabbar-item>
      <van-tabbar-item name="/charts" icon="chart-trending-o">图表</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  computed: {
    active: {
      get: function() {
        const routeFullPath = this.$route.fullPath
        const arrRoute = routeFullPath.split('/')
        return `/${arrRoute[1]}`
      },
      set: function() {}
    }
  },
  methods: {
    tabChange: function(active) {
      this.$router.replace(active)
    }
  }
}
</script>
<style lang="scss" scoped></style>
