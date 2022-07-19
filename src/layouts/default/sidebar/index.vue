<template>
  <el-aside width="242px" class="h-full border-r-0">
    <el-menu
      class="el-menu-vertical-demo h-full"
      background-color="#545c64"
      active-text-color="#ffd04b"
      :default-active="useMenuStatusStore().getSideBarDefault"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import MenuItem from './menuItem.vue'

import { usePermissionStore } from '@/store/modules/permission'
import { useMenuStatusStore } from '@/store/modules/menuStatus'

const menuList = computed(() => {
  return usePermissionStore().getBackMenuList
})
console.log('🤡 ~~ menuList', menuList)
</script>

<style scoped lang="scss"></style>
