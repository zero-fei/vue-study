let kVue

class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    const computed = {}
    // 暗号：天王盖地虎
    this.getters = {}
    const getters = options.getters || {}
    Object.keys(getters).forEach((key) => {
      const fn =  getters[key]
      computed[key] = () => {
        return fn(this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => fn(this.state),
        enumerable: true
      })
    });
    this._vm = new kVue({
      data: {
        $$state: options.state
      },
      computed
    })
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state')
  }
  commit = (type, payload) => {
    // 根据type获取对应的mutations
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unknown mutation type')
      return
    } 
    entry(this.state, payload)
  }
  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('unknown action type')
      return
    } 
    return entry(this, payload)
  }
}

function install(Vue) {
  kVue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install, kVue }