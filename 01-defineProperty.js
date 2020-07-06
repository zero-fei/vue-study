// 对象响应式原理

function defineReactive (obj, key, val) {

  // val可能是对象需要递归
  observe(val)

  Object.defineProperty(obj, key, {
    get () {
      console.info('get', val)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.info('set', newVal)
        val = newVal
        observe(val)
      }
    }
  })
}

function set (obj, key, val) {
  defineReactive(obj, key, val)
}

// 对象做响应处理
function observe (obj) {
  // 判断obj必须是个对象
  if (typeof obj !== 'object' || obj === null) return
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: '1'
  }
}

// defineReactive(obj, 'foo', 'foo')
observe(obj)

// obj.foo
// obj.foo = 'fooooo'
// obj.bar
// obj.baz.a
// obj.baz.a = 1
// obj.baz = { a: 10 }
// obj.baz.a = 100
obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong

