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
              v-model.trim="formData.title"
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
        <!-- <el-col :span="12">
          <el-form-item label="品类" prop="spg_id">
            <el-select
              v-model="formData.spg_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in category"
                :key="item.spg_id"
                :label="item.name"
                :value="item.spg_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditGood } from '@/api/goods/good'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'
import { getProduct } from '@/api/goods/product'

export default defineComponent({
  name: 'UserForm',
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
    const product = ref([])

    onMounted(() => {
      Object.keys(formData).forEach((key) => {
        formData[key] = props.data[key]
      })
      getProductList()
    })
    // 产品列表
    const getProductList = async () => {
      const res = await getProduct({
        page: 1,
        pageSize: 5000
      })
      product.value = res.data.records
    }

    const changeCascader = (val) => {
      console.log(val)
    }

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createOrEditGood({
              ...formData,
              price: Number(formData.price)
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
      whether,
      product,
      changeCascader
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
