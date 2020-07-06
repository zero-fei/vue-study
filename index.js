// 对象响应式原理

function defineReactive (obj, key, val) {

  // val可能是对象需要递归
  observe(val)

  // 每执行一次defineReactive， 就创建一个Dep实例
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get () {
      // console.info('get', val)
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        // console.info('set', newVal)
        val = newVal
        observe(val)

        // 通知更新 
        dep.notify()
      }
    }
  })
}

// 对象做响应处理
function observe (obj) {
  // 判断obj必须是个对象
  if (typeof obj !== 'object' || obj === null) return
  // Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  new Observe(obj)
}

// 将$data key 代理到 vue实例上
function proxy (vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data[key]
      },
      set (val) {
        vm.$data[key] = val
      }
    })
  })
}

class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this)

    // 编译
    new Compile(options.el, this)
  }

}

class Observe {
  constructor(value) {
    this.value = value
    // 判读value是obj还是数组
    this.walk(value)
  }
  walk (obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

// 编译过程
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile (el) {
    // 递归遍历el
    // 判断其类型
    el.childNodes.forEach(node => {
      // 判断其类型
      if (this.isElement(node)) {
        console.info('编译元素', node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        this.compileText(node)
        console.info('编译插值表达式', node.textContent)
      }
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 更新函数（动态绑定都需要创建更新函数）
  update (node, exp, dir) {
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新
    new Watcher(this.$vm, exp, () =>
      fn && fn(node, this.$vm[exp])
    )
  }

  // 元素
  isElement (node) {
    return node.nodeType === 1
  }

  // 判断是否为插值表达式 {{x}}
  isInter (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  isDirective (attrName) {
    return attrName.indexOf('k-') === 0
  }

  // 插值文本的编译
  compileText (node) {
    // 获取匹配表达式的值
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  compileElement (node) {
    // 获取节点属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // k-'xxx'='aaa'
      const attrName = attr.name
      const exp = attr.value
      // 判断这个属性类型
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        // 执行指令
        this[dir] && this[dir](node, exp)
      } else if (attrName.startsWith('@')) {
        // 暗号：冬瓜冬瓜我是西瓜
        this.bindMethods(node, attrName.split('@')[1], exp)
      }
    })
  }

  bindMethods (node, name, exp) {
    node.addEventListener(name, () => {
      const fn = this.$vm.$options.methods[exp]
      fn && fn.call(this.$vm)
    })
  }


  // 操作方法
  text (node, exp) {
    this.update(node, exp, 'text')
  }
  textUpdater (node, value) {
    node.textContent = value
  }
  html (node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }
  htmlUpdater (node, val) {
    node.innerHTML = val
  }
}

// 实现watcher
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 读一次数据，触发defineReactive get()
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update () {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  addDep (watcher) {
    this.deps.push(watcher)
  }
  notify () {
    this.deps.forEach(watcher => watcher.update())
  }
}