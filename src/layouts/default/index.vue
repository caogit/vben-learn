<template>
  <div>
    <div class="w-full h-10 bg-cyan-400">加载成功，下面是你的页面</div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
</script>
