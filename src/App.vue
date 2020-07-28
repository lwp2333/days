<template>
  <div id="app">
    <navbar-main></navbar-main>
    <app-tabbar></app-tabbar>
  </div>
</template>

<script>
import navbarMain from '@/layout/navbarMain'
import tabbar from '@/layout/tabbar'
export default {
  name: 'layout',
  components: {
    appTabbar: tabbar,
    navbarMain
  },
  data: function() {
    return {}
  },
  created: function() {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
