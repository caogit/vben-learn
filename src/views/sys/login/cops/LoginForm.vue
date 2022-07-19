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
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const form = reactive({
  username: 'caoao',
  password: '123456',
})

async function onLogin() {
  try {
    await userStore.login(form)
  } catch (error) {}
  // LoginSystem({
  //   ...form.value,
  //   uuid: 'b8cc316c2776465fada540859c4b24ay',
  //   code: '0',
  // })
  //   .then((res) => {

  //   })
  //   .catch((err) => {})
}
</script>
