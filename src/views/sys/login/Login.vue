<template>
  <div
    class="w-full h-full box-border bg-[url('/src/assets/images/0023.jpg')] bg-cover"
  >
    <!-- <div class="h-4 text-right font-bold">可以切换颜色</div> -->
    <div
      class="max-w-[1600px] border border-red-700 border-solid h-full mx-auto p-5 flex"
    >
      <div class="flex-1 flex flex-col items-start">
        <img src="@/assets/images/testImg.jpg" class="max-w-md" />
        <div class="text-5xl text-white my-2">cmd管理平台</div>
      </div>
      <div class="flex-1 p-24">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './cops/LoginForm.vue'
</script>
