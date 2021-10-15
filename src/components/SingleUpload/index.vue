/*
 * @Author: 唐云
 * @Date: 2021-10-13 14:58:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-13 16:16:18
 单个图片上传
 */
<template>
  <div>
    <el-upload
      :action="uploadUrl"
      list-type="picture"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :headers="{ Authorization: 'Bearer ' + token }"
    >
      <el-button type="primary" size="small">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过10MB
      </div>
    </el-upload>
    <el-dialog v-if="dialogVisible" v-model="dialogVisible">
      <img style="width:100%; height:100%;" :src="fileList[0].url[0].url" alt="" />
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, defineEmits, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  value: String
})
const emit = defineEmits(['input'])

const uploadUrl = window._BASE_CONFIG.baseUrl + '/pms/products/upload'
const dialogVisible = ref(false)

const token = computed(() => store.state.user.token)
const imageUrl = computed(() => props.value)
const imageName = computed(() => {
  if (props.value) {
    return props.value.substr(props.value.lastIndexOf('/') + 1)
  } else {
    return null
  }
})
const fileList = computed(() => {
  if (props.value) {
    return [
      {
        name: imageName,
        url: imageUrl
      }
    ]
  } else {
    return []
  }
})
const showFileList = ref(false)

const emitInput = (val) => {
  emit('input', val)
}
const handleRemove = (file, fileList) => {
  emitInput('')
}
const handlePreview = (file) => {
  console.log('sdafsdf')
  dialogVisible.value = true
}
const beforeUpload = (file) => {}
const handleUploadSuccess = (res, file) => {
  showFileList.value = true
  fileList.value.pop()
  console.log(fileList.value)
  const url = res.url
  fileList.value.push({ name: file.name, url })
  console.log(fileList.value[0].url)
  emitInput(fileList.value[0].url)
}
</script>

<style lang='scss' scoped>
</style>
