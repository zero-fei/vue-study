<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
    }
  },
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      // 获取校验规则和数据
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      const schema = new Schema({[this.prop]: rules})
      schema.validate({[this.prop]: value}, error => {
        if(error) {
          this.error = error[0].message 
        } else {
          this.error = ''
        }
      })
    }
  }
}
</script>

<style>
  .error {
    color: red;
  }
</style>