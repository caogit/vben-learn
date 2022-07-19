<template>
  <el-container class="w-full h-full">
    <sidebar ref="sidebarRef"></sidebar>
    <el-container direction="vertical">
      <headers></headers>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import headers from '@/layouts/default/headers/index.vue'
import sidebar from '@/layouts/default/sidebar/index.vue'
const route = useRoute()
const sidebarRef = ref()
</script>

<style scoped lang="scss"></style>
