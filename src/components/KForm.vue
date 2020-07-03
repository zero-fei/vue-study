<template>
    <div>
      <slot></slot>
    </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this // 传递自己的实例
    }
  },
  props: {
    model: {
      type: Object,
      required:true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
      Promise.all(tasks).then((val) => {
        if(!val[0]) cb(false)
        cb(true)
      }).catch(() => {
        console.info(22)
        cb(false)
      })
    }
  }
}
</script>

<style>

</style>