let kVue;
// 插件
class KVueRouter {
  constructor(options) {
    this.$options = options

    const initial = window.location.hash.slice(1) || '/'
    kVue.util.defineReactive(this, 'current', initial)

    window.addEventListener('hashchange', this.onHashChange)
    window.addEventListener('load', this.onHashChange)
    this.routerMap = {}
    this.$options.routes.forEach(route => {
      this.routerMap[route.path] = route
    })
  }
  onHashChange = () => {
    this.current = window.location.hash.slice(1)
  }
}

KVueRouter.install = function(Vue) {
  // 保存构造函数
  kVue = Vue
  // 1.挂在$router
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        // 挂载
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  
  // 2.实现两个全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true, 
        default: ''
      },
    },
    render(h) {
      // 获取路由器实例
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render(h) {
      const { routerMap, current } = this.$router
      const comp = routerMap[current] ? routerMap[current].component : null
      return h(comp)
    }
  })
}
export default KVueRouter