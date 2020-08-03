<template>
  <div class="navbarMain">
    <van-nav-bar v-if="showNavbar" fixed :title="title" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <slot name="navbarRight"></slot>
      </template>
    </van-nav-bar>
    <app-main :class="{ marginTop: showNavbar }"></app-main>
  </div>
</template>

<script>
import main from '@/layout/main'
export default {
  name: 'navbarMain',
  components: {
    appMain: main
  },
  computed: {
    title: function() {
      return this.$route.meta.title
    },
    showNavbar: function() {
      return this.$route.meta.showNavbar
    }
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.marginTop {
  margin-top: 11.12vw;
}
</style>
