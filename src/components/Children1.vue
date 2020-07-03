<template>
  <div>
    {{$attrs.msg}}
    {{tips}}
    {{data}}
    <slot :tips="tips"></slot>
    <slot name="aa"></slot>
  </div>
</template>

<script>
export default {
  props: {

  },
  inject: ['data'],
  data() {
    return {
      // msg: '第一个页面'
      tips: ''
    }
  },
  mounted () {
    this.$parent.$bus.$on('sendMessage', (msg) => {
      this.tips = msg
    });
  },
}
</script>

<style>
 
</style>