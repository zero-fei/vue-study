<template>
  <KForm :model="model" :rules="rules" ref="form">
    <KFormItem label="用户名" prop='username'>
      <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
    </KFormItem>
    <KFormItem label="密码" prop='password'>
      <KInput v-model="model.password" placeholder="请输入密码"></KInput>
    </KFormItem>
    <KFormItem>
      <button @click="login">登陆</button>
      <router-link to='/hello'>hello</router-link>
    </KFormItem>
  </KForm>
</template>

<script>
import KFormItem from '../components/KFormItem'
import KInput from '../components/KInput'
import KForm from '../components/KForm'
import Notice from '../components/Notice'
import { create } from '../utils/func'

export default {
  components: { KInput, KFormItem, KForm },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名'}],
        password: [{required: true, message: '请输入密码'}]
      }
    }
  },
  methods: {
    login() {
      this.$refs['form'].validate((isValid) => {
        create(Notice, { 
          title: '测试',
          message: isValid ? '成功' : '失败',
          duration: 1000
        })
      })
    }
  }
}
</script>

<style>

</style>