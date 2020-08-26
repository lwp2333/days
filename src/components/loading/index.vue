<template>
  <transition name="loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="loading-mask">
      <!--loading中间的图标-->
      <div class="loading-box">
        <van-image width="64vw" fit="contain" :src="loadingGif" />
        <span>{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import loadingGif from '../../../static/img/loading.gif'
export default {
  name: 'Loading',
  data: function() {
    return {
      loadingGif,
      visible: false,
      text: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-mask {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-box {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .loading-box span {
    color: #000;
    font-size: 15px;
    text-align: center;
  }
}
</style>
