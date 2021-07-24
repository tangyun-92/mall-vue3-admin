/*
 * @Author: 唐云
 * @Date: 2021-07-24 23:53:51
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-24 23:54:12
 */

<template>
  <div class="home-view">
    <el-empty description="用户管理" />
    用户管理
  </div>
</template>

<script setup>
import { getUser } from '@/api/system/user'
import { onMounted } from '@vue/runtime-core'

onMounted(async () => {
  const res = await getUser()
  console.log(res)
})
</script>

<style lang="scss" scoped></style>
