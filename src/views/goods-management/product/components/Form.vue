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
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input
              v-model.trim="formData.title"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="副标题" prop="sub_title">
            <el-input
              v-model.trim="formData.sub_title"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类" prop="category_id">
            <el-cascader
              v-model="formData.category_id"
              :options="goodCategory"
              :props="cascaderProps"
              filterable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brand_id">
            <el-select
              v-model="formData.brand_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in brand"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
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
        </el-col>
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
      </el-row>
      <el-row>
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
import { createOrEditProduct } from '@/api/goods/product'
import { getGoodsCategory } from '@/api/goods/goods-category'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'
import { getBrand } from '@/api/goods/brand'
import { getCategory } from '@/api/goods/category'

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
      title: '',
      sub_title: '',
      category_id: null,
      brand_id: null,
      spg_id: null,
      saleable: null,
      valid: null,
      id: null
    })
    // 校验规则
    const rules = {
      title: [{ required: true, message: '不能为空', trigger: 'blur' }],
      category_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      spg_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      saleable: [{ required: true, message: '不能为空', trigger: 'change' }],
      valid: [{ required: true, message: '不能为空', trigger: 'change' }]
    }
    // 商品分类数据
    const goodCategory = ref([])
    // 商品分类级联配置
    const cascaderProps = ref({
      label: 'name',
      value: 'id',
      checkStrictly: false,
      emitPath: false
    })
    // 品牌数据
    const brand = ref([])
    // 品类数据
    const category = ref([])

    onMounted(() => {
      Object.keys(formData).forEach((key) => {
        formData[key] = props.data[key]
      })
      getGoodsCategoryList()
      getBrandList()
      getCategoryList()
    })

    // 商品分类列表
    const getGoodsCategoryList = async () => {
      const res = await getGoodsCategory()
      goodCategory.value = res.data.records
    }
    // 品牌列表
    const getBrandList = async () => {
      const res = await getBrand({
        page: 1,
        pageSize: 5000
      })
      brand.value = res.data.records
    }
    // 品类列表
    const getCategoryList = async () => {
      const res = await getCategory({
        page: 1,
        pageSize: 5000
      })
      category.value = res.data.records
    }

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createOrEditProduct(formData)
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
      goodCategory,
      cascaderProps,
      brand,
      category
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
