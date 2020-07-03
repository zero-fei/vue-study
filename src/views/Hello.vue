<template>
  <div>
    Hello World
    <div @click="$store.commit('add')">count: {{$store.state.count}}</div>
    <div @click="$store.dispatch('add')">async count: {{$store.state.count}}</div>
    <div>doubel count: {{$store.getters.doubleCounter}}</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>