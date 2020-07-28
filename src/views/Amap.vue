<template>
  <div class="container">
    <div id="map"></div>
    <div class="action">
      <van-button type="primary" @click="handleGetLocation">获取经纬度</van-button>
      <van-button type="info" @click="handleSetLocation">设置经纬度</van-button>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'Amap',
  components: {},
  data: function() {
    return {
      map: null,
      option: {
        viewMode: '3D'
      }
    }
  },
  created: function() {},
  computed: {},
  mounted: function() {
    this.$nextTick(() => {
      this.initAmap()
    })
  },
  methods: {
    initAmap: async function() {
      const AMap = await AMapLoader.load({
        key: 'fec70c1bef7d9427a44c9ecefce31959', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [] //插件列表
      }).catch(e => {
        console.log(e)
      })
      this.map = new AMap.Map('map', this.option)
    },
    handleGetLocation: function() {
      const { lat, lng } = this.map.getCenter()
      this.$notify({
        type: 'success',
        message: lng + ',' + lat
      })
    },
    handleSetLocation: function() {
      // 传入经纬度，设置地图中心点
      const zoom = 14
      const position = [117.214664, 29.29256]
      /** 中心点 */
      this.map.setCenter(position)
      /** 设置zoom */
      const curZoom = this.map.getZoom()
      this.$notify({
        type: 'success',
        message: `zoom: ${curZoom}`
      })
      setTimeout(() => {
        this.map.setZoom(zoom)
      }, 1200)
      /** 同时设置zoom和中心点 */
      // this.map.setZoomAndCenter(zoom, position)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: auto;
  #map {
    width: 100vw;
    height: calc(88vh - 48px);
  }
  .action {
    display: flex;
    padding: 18px;
    justify-content: space-around;
  }
}
</style>
