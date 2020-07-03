<template>
  <div>
    {{msg}}
    <button @click="handleSend">发送消息</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '第二个页面'
    }
  },
  methods: {
    handleSend() {
      this.$parent.$bus.$emit('sendMessage', '数据来自第二个子')
    }
  }
}
</script>

<style>

</style>