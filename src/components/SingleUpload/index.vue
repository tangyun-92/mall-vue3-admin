/*
 * @Author: 唐云
 * @Date: 2021-10-13 14:58:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-22 14:02:48
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
      <el-button v-if="!imageUrl" type="primary" size="small">点击上传</el-button>
      <img
        v-if="imageUrl"
        style="width: 80px; height: 80px"
        :src="imageUrl"
        alt=""
      />
      <div class="el-upload__tip">
        只能上传jpg/png文件，且不超过10MB
      </div>
    </el-upload>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, defineEmits, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  name: String
})
const emit = defineEmits(['input'])
const uploadUrl = window._BASE_CONFIG.baseUrl + '/pms/products/upload'
const dialogVisible = ref(false)

const token = computed(() => store.state.user.token)
const imageUrl = computed(() => props.modelValue)
const imageName = computed(() => {
  if (imageUrl.value !== null && imageUrl.value !== '') {
    return imageUrl.value.substr(imageUrl.value.lastIndexOf('/') + 1)
  } else {
    return null
  }
})
const fileList = computed(() => {
  if (imageUrl.value) {
    return [
      {
        name: imageName.value,
        url: imageUrl.value
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
  dialogVisible.value = true
}
const beforeUpload = (file) => {}
const handleUploadSuccess = (res, file) => {
  showFileList.value = true
  fileList.value.pop()
  const url = res.url
  fileList.value.push({ name: file.name, url })
  emitInput({ url: fileList.value[0].url, name: fileList.value[0].name, colorName: props.name })
}
</script>

<style lang='scss' scoped>
</style>
