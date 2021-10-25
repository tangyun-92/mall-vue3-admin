/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 15:29:14
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="130px"
      label-position="right"
      size="small"
      :disabled="status === 'details'"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="sub_title">
        <el-input v-model.trim="formData.sub_title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="show_status">
        <el-select
          v-model="formData.show_status"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in ifShow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model.trim="formData.sort"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="优选主题图片" prop="pic">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :headers="{ Authorization: 'Bearer ' + token }"
        >
          <img
            v-if="uploadData.imageUrl"
            :src="uploadData.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineExpose, defineProps, onMounted, reactive, ref } from 'vue'
import { createOrEditPreference } from '@/api/marketing/preference'
import { ElMessage } from 'element-plus'
import useUploadHooks from '@/hooks/useUploadHooks'
import { ifShow } from '@/constants/dictionary'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  status: {
    type: String,
    default: 'create'
  }
})

const uploadUrl = window._BASE_CONFIG.baseUrl + '/cms/preferences/upload'
const formRef = ref(null)
// 表单数据
const formData = reactive({
  name: '',
  sub_title: '',
  show_status: null,
  pic: '',
  sort: null,
  id: null
})
// 校验规则
const rules = {
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  show_status: [{ required: true, message: '不能为空', trigger: 'change' }]
}

const { token, uploadSuccess, beforeUpload, uploadData } = useUploadHooks({})

onMounted(() => {
  Object.keys(formData).forEach((key) => {
    formData[key] = props.data[key]
  })
  uploadData.imageUrl = props.data.pic
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await createOrEditPreference({
          ...formData,
          pic: uploadData.imageUrl
        })
        ElMessage.success(res.message)
        resolve(res)
      } else {
        resject('表单验证未通过')
      }
    })
  })
}

defineExpose({
  submit
})
</script>

<style lang='scss' scoped>
</style>
