<template>
  <div class="container">
    <mavon-editor v-model="md.content" :toolbars="toolbars" :ishljs="true" :subfield="false" />
  </div>
</template>

<script>
import { toolbars } from '@/common/constant/mavonEditor'
import md from '@/common/docs/loading.md.js'
export default {
  name: 'BlogDetail',
  components: {},
  data: function() {
    return {
      toolbars,
      md
    }
  },
  created: function() {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.markdown-body {
  min-height: 80vh;
}
.v-note-wrapper {
  z-index: 1;
}
</style>
