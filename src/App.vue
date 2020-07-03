<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-link to='/'>home</router-link>
    |
    <router-link to='/hello'>hello</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  provide() {
    return {  
      data: 'index'
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
