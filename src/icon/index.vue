<template>
  <div class="container">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="IconSymbol"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    iconName: {
      required: true,
      type: String
    }
  },
  computed: {
    IconSymbol: function() {
      return `#${this.iconName}`
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  width: 8vw;
  height: 8vw;
  vertical-align: -1.2vw;
  fill: currentColor;
  overflow: hidden;
}
</style>
