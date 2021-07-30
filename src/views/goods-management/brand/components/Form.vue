/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 13:14:18
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="100px"
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
      <el-form-item label="品牌首字母" prop="letter">
        <el-input
          v-model.trim="formData.letter"
          placeholder="请输入"
        ></el-input>
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
    </el-form>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditBrand } from '@/api/goods/brand'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import useUploadHooks from '@/hooks/useUploadHooks'

export default defineComponent({
  name: 'EmployeeForm',
  props: {
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
  },
  setup(props) {
    const uploadUrl = window._BASE_CONFIG.baseUrl + '/brands/upload'
    const store = useStore()
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      name: '',
      image: '',
      letter: '',
      id: null
    })
    // 校验规则
    const rules = {
      letter: [{ required: true, message: '不能为空', trigger: 'blur' }],
      name: [{ required: true, message: '不能为空', trigger: 'blur' }]
    }

    const token = computed(() => store.state.user.token)

    const { uploadSuccess, beforeUpload, uploadData } = useUploadHooks()

    onMounted(() => {
      Object.keys(formData).forEach(key => {
        formData[key] = props.data[key]
      })
      uploadData.imageUrl = props.data.image
    })

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async valid => {
          if (valid) {
            const res = await createOrEditBrand({
              ...formData,
              image: uploadData.imageUrl
            })
            ElMessage.success(res.message)
            resolve(res)
          } else {
            resject('表单验证未通过')
          }
        })
      })
    }

    return {
      rules,
      submit,
      formData,
      formRef,
      uploadUrl,
      token,
      uploadSuccess,
      beforeUpload,
      uploadData
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
