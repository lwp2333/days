<template>
  <div class="mainContainer">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'mainContainer',
  components: {},
  data: function() {
    return {}
  },
  created: function() {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.mainContainer {
  height: auto;
  margin-bottom: 12.54vw;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
