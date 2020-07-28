<template>
  <div class="tabbar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/amap" icon="search">地图</van-tabbar-item>
      <van-tabbar-item icon="friends-o">博客</van-tabbar-item>
      <van-tabbar-item icon="setting-o">关于我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  components: {},
  data: function() {
    return {
      active: 0
    }
  },
  created: function() {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
