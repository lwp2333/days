import LoadingComponent from './index.vue'

export default {
  install(Vue, options) {
    /**
     * 使用 Vue.extend 构造器，创建一个“子类” (Loading)。参数是一个包含组件选项的对象(LoadingComponent)。
     * 然后 创建一个 Loading 的实例 Profile 挂载到一个HTMLElement实例上
     */
    const Loading = Vue.extend(LoadingComponent)
    const instance = new Loading({
      el: document.createElement('div')
    })

    // 插入到document.body
    const parent = document.body
    parent.appendChild(instance.$el)
    if (options) {
      instance.text = options.text
    }

    const loadingMethod = {
      show(text) {
        instance.visible = true
        text ? (instance.text = text) : ''
      },
      hide() {
        instance.visible = false
      }
    }
    Vue.prototype.$myLoading = loadingMethod
  }
}
