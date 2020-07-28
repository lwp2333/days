<template>
  <div class="container">
    <mavon-editor v-model="content" :toolbars="toolbars" :ishljs="true" :subfield="false" />
  </div>
</template>

<script>
import { toolbars } from '@/common/options/mavonEditor'
export default {
  name: 'BlogDetail',
  components: {},
  data: function() {
    return {
      toolbars,
      content: "```js\nconst a ='堃堃' \nconst b = function(){\n}\n```\n"
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
