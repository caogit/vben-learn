<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="账号">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input show-password v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" type="primary" @click="onLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { LoginSystem } from '/@/api/Login/login'
const form = ref({
  username: 'admin',
  password: 'admin123',
})

const onLogin = () => {
  console.log(LoginSystem)

  // LoginSystem(form)
  //   .then((res) => {
  //     console.log('🤡 ~~ res', res)
  //   })
  //   .catch((err) => {})
}
</script>
