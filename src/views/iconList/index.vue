<template>
  <div class="container">
    <van-grid :gutter="6" square>
      <van-grid-item v-for="(item, index) in iconList" :key="index" @click="iconClick(item)">
        <template #icon>
          <lwp-icon :iconName="item.className"></lwp-icon>
        </template>
        <template #text>
          <span class="greyText">
            {{ item.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import lwpIcon from '@/icon/index'
import iconList from '@/icon/iconfont'
export default {
  name: '',
  components: {
    lwpIcon
  },
  data: function() {
    return {
      iconList
    }
  },
  created: function() {},
  computed: {},
  methods: {
    iconClick: function(item) {
      this.$notify({
        duration: 640,
        type: 'success',
        message: `点击了：${item.name} 图标`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.greyText {
  font-size: 12px;
  margin-top: 6px;
  color: rgba($color: #000000, $alpha: 0.72);
}
</style>
