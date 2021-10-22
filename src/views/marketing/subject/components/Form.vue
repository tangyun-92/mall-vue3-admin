/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 13:27:27
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
      <el-form-item label="品牌名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌首字母" prop="first_letter">
        <el-input
          v-model.trim="formData.first_letter"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否为品牌制造商" prop="factory_status">
        <el-select v-model="formData.factory_status" placeholder="请选择" clearable>
          <el-option
            v-for="item in whether"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示" prop="show_status">
        <el-select v-model="formData.show_status" placeholder="请选择" clearable>
          <el-option
            v-for="item in whether"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌logo" prop="image">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :headers="{ Authorization: 'Bearer ' + token }"
        >
          <img v-if="uploadData.imageUrl" :src="uploadData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="品牌故事" prop="brand_story">
        <el-input
          v-model.trim="formData.brand_story"
          type="textarea"
          :rows="5"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineExpose, defineProps, onMounted, reactive, ref } from 'vue'
import { createOrEditBrand } from '@/api/good/brand'
import { ElMessage } from 'element-plus'
import useUploadHooks from '@/hooks/useUploadHooks'
import { whether } from '@/constants/dictionary'

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

const uploadUrl = window._BASE_CONFIG.baseUrl + '/pms/brands/upload'
const formRef = ref(null)
// 表单数据
const formData = reactive({
  name: '',
  first_letter: '',
  factory_status: null,
  show_status: null,
  logo: '',
  brand_story: '',
  id: null
})
// 校验规则
const rules = {
  name: [{ required: true, message: '不能为空', trigger: 'blur' }]
}

const { token, uploadSuccess, beforeUpload, uploadData } = useUploadHooks({})

onMounted(() => {
  Object.keys(formData).forEach(key => {
    formData[key] = props.data[key]
  })
  uploadData.imageUrl = props.data.logo
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async valid => {
      if (valid) {
        const res = await createOrEditBrand({
          ...formData,
          logo: uploadData.imageUrl
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
