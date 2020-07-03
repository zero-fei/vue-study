<template>
  <div>
    <input :value="value" :type="type" @input="handleInput" v-bind="$attrs"/>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
      // 触发校验
      this.$parent.$emit('validate')
    }  
  }
}
</script>

<style>

</style>