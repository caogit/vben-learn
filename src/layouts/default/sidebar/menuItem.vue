<template>
  <template v-for="item in props.menuList" :key="item.name">
    <template v-if="!item.hideMenu">
      <el-sub-menu :index="item.path" v-if="item.children">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <template v-if="item.children">
          <MenuItem :menu-list="item.children"></MenuItem>
        </template>
      </el-sub-menu>
      <el-menu-item :index="item.path" v-else>
        <el-icon><setting /></el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>

<script lang="ts" setup>
import { ref, reactive, PropType } from 'vue'
import { Menu } from '@/router/type'

const props = defineProps({
  menuList: {
    type: Array as PropType<Menu[]>,
    required: true,
  },
})
</script>

<style scoped lang="scss"></style>
