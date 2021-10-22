/*
 * @Author: 唐云
 * @Date: 2021-10-13 14:58:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-22 13:56:45
 多个图片上传
 */
<template>
  <div>
    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="props.maxCount"
      :on-exceed="handleExceed"
      :headers="{ Authorization: 'Bearer ' + token }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" append-to-body>
      <img style="width: 100%; height:100%;" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, defineProps, ref, defineEmits, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  modelValue: {
    type: Array,
    default: []
  },
  maxCount: {
    type: Number,
    default: 5
  }
})
const emit = defineEmits(['input'])
const uploadUrl = window._BASE_CONFIG.baseUrl + '/pms/products/upload'
const dialogVisible = ref(false)
const dialogImageUrl = ref(null)

const token = computed(() => store.state.user.token)
const imageUrl = computed(() => props.modelValue)

const fileList = computed(() => {
  const fileList = []
  const newArrar = imageUrl.value
  for (let i = 0; i < newArrar.length; i++) {
    fileList.push({ url: newArrar[i] })
  }
  return fileList
})

const emitInput = (fileList) => {
  const value = []
  for (let i = 0; i < fileList.length; i++) {
    value.push(fileList[i].url)
  }
  emit('input', value)
}
const handleRemove = (file, fileList) => {
  emitInput(fileList)
}
const handlePreview = (file) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
const beforeUpload = (file) => {}
const handleUploadSuccess = (res, file) => {
  const url = res.url
  fileList.value.push({ name: file.name, url })
  emitInput(fileList.value)
}
const handleExceed = (file, fileList) => {
  ElMessage.warning(`最多只能上传${props.maxCount}张图片`)
}
</script>

<style lang='scss' scoped>
</style>
