<template>
  <div class="hello">
    <children1 v-bind="$attrs">
      <template v-slot:default="slotProps">
        <div>{{slotProps.tips}}</div>
      </template>
      <template v-slot:aa>
        <div>AA</div>
      </template>
    </children1>
    <children2></children2>
  </div>
</template>

<script>  
import Children1 from './Children1.vue'
import Children2 from './Children2.vue'

export default {
  name: 'HelloWorld',
  components: {
    Children1,
    Children2
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
