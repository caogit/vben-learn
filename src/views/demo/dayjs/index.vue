<template>
    <div>使用dayjs</div>
</template>

<script lang='ts' setup>
import {ref,reactive} from 'vue'
import dayjs,{} from 'dayjs'
import utc from 'dayjs/plugin/utc'

const day=  new Date()


dayjs.extend(utc)
const now = dayjs(day).day()
console.log("🤡 ~~ now", now)

</script>

<style scoped lang='scss'>
  
</style>