/*
 * @Author: 唐云
 * @Date: 2021-07-24 23:53:51
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-26 22:37:18
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
import AES from '@/utils/aes'

onMounted(async () => {
  const res = await getUser()
})

</script>

<style lang="scss" scoped></style>
