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
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品" prop="spu_id">
            <el-select
              v-model="formData.spu_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in product"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input
              v-model.trim="formData.price"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否上架" prop="saleable">
            <el-select
              v-model="formData.saleable"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in whether"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有效" prop="valid">
            <el-select v-model="formData.valid" placeholder="请选择" clearable>
              <el-option
                v-for="item in whether"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="img-upload">
        <el-form-item label="商品图片" prop="image">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="#"
            list-type="picture-card"
            :on-change="uploadChange"
            :on-remove="uploadRemove"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :headers="{ Authorization: 'Bearer ' + token }"
            :limit="6"
            :multiple="true"
            :on-exceed="uploadExceed"
            :file-list="fileList"
            :auto-upload="false"
            :show-file-list="true"
          >
            <!-- <img v-if="uploadData.imageUrl" :src="uploadData.imageUrl" class="avatar"> -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button class="upload-to" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { computed, defineProps, defineExpose, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditProduct, uploadImage } from '@/api/good/product'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'
import useUploadHooks from '@/hooks/useUploadHooks'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  product: {
    type: Array,
    default() {
      return []
    }
  },
  status: {
    type: String,
    default: 'create'
  }
})

const formRef = ref(null)
// 表单数据
const formData = reactive({
  spu_id: null,
  title: '',
  images: '',
  price: null,
  param: '',
  saleable: null,
  valid: null,
  id: null
})
// 校验规则
const rules = {
  spu_id: [{ required: true, message: '不能为空', trigger: 'change' }],
  title: [{ required: true, message: '不能为空', trigger: 'blur' }],
  price: [{ required: true, message: '不能为空', trigger: 'blur' }],
  saleable: [{ required: true, message: '不能为空', trigger: 'change' }],
  valid: [{ required: true, message: '不能为空', trigger: 'change' }]
}
// 品牌数据
// const paramList = ref([])

const { token, uploadChange, uploadRemove, uploadSuccess, beforeUpload, uploadExceed, fileList, uploadData, submitUpload, upload } = useUploadHooks({ reqFn: uploadImage })

const paramData = computed(() => props.param)

onMounted(() => {
  Object.keys(formData).forEach((key) => {
    formData[key] = props.data[key]
  })
  if (props.data.images) {
    fileList.value = props.data.images
  }
  // getGoodParamList(props.data.spu_id)
})
// 获取商品参数列表
// const getGoodParamList = async (spu_id) => {
//   const res = await getGoodParam(spu_id)
//   paramList.value = res.data
// }

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        console.log(fileList)
        const res = await createOrEditProduct({
          ...formData,
          param: paramData.value,
          price: Number(formData.price),
          images: fileList.value
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
.dynamic-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .el-input {
    width: 280px;
  }
}

.avatar-uploader-icon {
  width: 148px;
  height: 148px;
  line-height: 148px;
}

.upload-to {
  margin: 20px 0 0 0;
}
</style>
