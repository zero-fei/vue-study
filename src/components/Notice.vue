<template>
  <div>{{title}}</div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    show() {
      alert('校验失败')
    }
  }
}
</script>

<style>

</style>