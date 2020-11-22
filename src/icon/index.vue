<template>
  <svg class="icon" :width="sizePx" :height="sizePx">
    <use :xlink:href="IconSymbol"></use>
  </svg>
</template>

<script>
export default {
  name: 'LwpIcon',
  props: {
    iconName: {
      required: true,
      type: String
    },
    size: {
      required: false,
      type: String || Number,
      default: 8
    }
  },
  computed: {
    IconSymbol: function() {
      return `#${this.iconName}`
    },
    sizePx: function() {
      if (typeof this.size === 'string') {
        switch (this.size) {
          case 'medium':
            return '10vw'
          case 'mini':
            return '8vw'
          case 'small':
            return '6vw'
          default:
            return '8vw'
        }
      }
      return ` ${this.size}vw`
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  fill: currentColor;
  overflow: hidden;
}
</style>
