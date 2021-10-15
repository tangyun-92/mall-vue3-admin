/*
 * @Author: 唐云
 * @Date: 2021-10-12 11:05:33
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 17:26:00
 商品属性
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      class="form-data"
      size="small"
    >
      <el-form-item label="属性类型:">
        <el-select
          v-model="formData.product_attribute_category_id"
          placeholder="请选择"
          filterable
          @change="changeAttributeType"
        >
          <el-option
            v-for="item in productAttributeCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 商品规格 -->
      <el-form-item label="商品规格:">
        <el-card shadow="never">
          <div v-for="(spec, index) in selectProductAttr" :key="spec.id">
            {{ spec.name }}：
            <el-checkbox-group
              v-if="spec.hand_add_status === 1"
              v-model="selectProductAttr[index].values"
            >
              <el-checkbox
                v-for="item in getInputListArr(spec.input_list)"
                :key="item"
                :label="item"
              >{{ item }}</el-checkbox>
            </el-checkbox-group>
            <div v-else>
              <el-checkbox-group
                v-model="selectProductAttr[index].values"
                class="attr-select"
              >
                <div
                  v-for="(item, idx) in selectProductAttr[index].options"
                  :key="item"
                  label=""
                >
                  <el-checkbox :label="item"></el-checkbox>
                  <el-button
                    type="text"
                    class="remove-attr"
                    @click="handleRemoveProductAttr(index, idx, item)"
                  >删除</el-button>
                </div>
              </el-checkbox-group>
              <el-input
                v-model="addProductAttr"
                clearable
                class="add-attr-input"
              ></el-input>
              <el-button @click="handleAddProductAttr(index)">增加</el-button>
            </div>
          </div>
        </el-card>
        <div class="product-spec-table">
          <el-table :data="formData.skuTableData" style="width: 100%">
            <el-table-column
              v-for="(item, index) in selectProductAttr"
              :key="item.id"
              :label="item.name"
            >
              <template #default="scope">
                {{ getProductSkuVal(scope.row, index) }}
              </template>
            </el-table-column>
            <el-table-column label="销售价格" prop="price">
              <template #default="scope">
                <el-input v-model="scope.row.price"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="商品库存" prop="stock">
              <template #default="scope">
                <el-input v-model="scope.row.stock"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存预警值" prop="low_stock">
              <template #default="scope">
                <el-input v-model="scope.row.low_stock"></el-input> </template></el-table-column>
            <el-table-column label="SKU编号" prop="sku_code">
              <template #default="scope">
                <el-input v-model="scope.row.sku_code"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleRemoveProductSku(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-btn">
            <el-button
              type="primary"
              size="small"
              @click="refreshList"
            >刷新列表</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleSyncPrice"
            >同步价格</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleSyncSku"
            >同步库存</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-if="hasAttrPic" label="属性图片:">
        <el-card shadow="never">
          <div v-for="item in selectProductAttrPics" :key="item.pic">
            <span>{{ item.name }}:</span>
            <SingleUpload v-model="item.pic" class="single-upload" />
          </div>
        </el-card>
      </el-form-item>
      <!-- 商品参数 -->
      <el-form-item label="商品参数:">
        <el-card shadow="never" class="card-pro-param">
          <div v-for="(item, index) in selectProductParam" :key="item.id">
            <el-form-item :label="item.name + ':'">
              <el-select
                v-if="item.input_type === 2"
                v-model="selectProductParam[index].value"
              >
                <el-option
                  v-for="val in getInputListArr(item.input_list)"
                  :key="val"
                  :label="val"
                  :value="val"
                ></el-option>
              </el-select>
              <el-input
                v-if="item.input_type === 1"
                v-model="selectProductParam[index].value"
              ></el-input>
            </el-form-item>
          </div>
        </el-card>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getGoodsAttributeCategoryMap } from '@/api/good/attribute-category'
import { getGoodsAttribute } from '@/api/good/attribute'
import { computed, defineProps, onMounted, reactive, ref, defineExpose, onUnmounted, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import SingleUpload from '@/components/SingleUpload/index.vue'
import { useStore } from 'vuex'

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  },
  editId: null
})

const store = useStore()

const formRef = ref(null)

const formData = computed(() => props.modelValue)
// const categoryId = computed(() => formData.value.product_attribute_category_id)

onMounted(() => {
  getProductAttributeCategoryList()
  if (formData.value.product_attribute_category_id !== null) {
    changeAttributeType(formData.value.product_attribute_category_id)
  }
})

/**
 * 商品属性
 */
const productAttributeCategory = ref([])
// 获取商品属性列表
const getProductAttributeCategoryList = () => {
  getGoodsAttributeCategoryMap().then((res) => {
    productAttributeCategory.value = res.data.records
  })
}
const selectProductAttr = ref([]) // 选中的商品属性
const selectProductParam = ref([]) // 选中的商品参数

const changeAttributeType = (id) => {
  // 获取商品属性
  getGoodsAttribute({
    attributeCategoryId: id
  }).then((res) => {
    selectProductAttr.value = []
    const listAttr = res.data.records.filter((item) => item.type === 1)
    for (let i = 0; i < listAttr.length; i++) {
      let options = listAttr[i].input_list.split(',')
      let values = []
      if (props.editId) {
        // 编辑状态
        if (listAttr[i].hand_add_status === 2) { // 2表示支持手动新增
          options = getEditAttrOptions(listAttr[i].id)
        }
        values = getEditAttrValues(i)
      }
      selectProductAttr.value.push({
        id: listAttr[i].id,
        name: listAttr[i].name,
        hand_add_status: listAttr[i].hand_add_status,
        input_list: listAttr[i].input_list,
        values,
        options
      })
    }
    selectProductParam.value = []
    const listParam = res.data.records.filter((item) => item.type === 2)
    for (let i = 0; i < listParam.length; i++) {
      let value = null
      if (props.editId) {
        // 编辑状态
        formData.value.productAttributeValueList.forEach((item, index) => {
          if (listParam[i].id === formData.value.productAttributeValueList[index].product_attribute_id) {
            value = formData.value.productAttributeValueList[index].value
          }
        })
      }
      selectProductParam.value.push({
        id: listParam[i].id,
        name: listParam[i].name,
        value,
        input_type: listParam[i].input_type,
        input_list: listParam[i].input_list
      })
    }
    console.log(selectProductParam.value)
  })
}
// 获取设置的手动添加属性
const getEditAttrOptions = (id) => {
  const options = []
  for (let i = 0; i < formData.value.productAttributeValueList.length; i++) {
    const attrVal = formData.value.productAttributeValueList[i]
    if (attrVal.product_attribute_id === id) {
      const strArr = attrVal.value.split(',')
      for (let j = 0; j < strArr.length; j++) {
        options.push(strArr[j])
      }
      break
    }
  }
  return options
}
// 获取选中的属性值
const getEditAttrValues = (index) => {
  const values = new Set()
  if (index === 0) {
    formData.value.skuTableData.forEach((item, index) => {
      const sku = formData.value.skuTableData[index]
      const sp_data = JSON.parse(sku.sp_data)
      if (sp_data !== null && sp_data.length >= 1) {
        values.add(sp_data[0].value)
      }
    })
  } else if (index === 1) {
    formData.value.skuTableData.forEach((item, index) => {
      const sku = formData.value.skuTableData[index]
      const sp_data = JSON.parse(sku.sp_data)
      if (sp_data !== null && sp_data.length >= 2) {
        values.add(sp_data[1].value)
      }
    })
  } else {
    formData.value.skuTableData.forEach((item, index) => {
      const sku = formData.value.skuTableData[index]
      const sp_data = JSON.parse(sku.sp_data)
      if (sp_data !== null && sp_data.length >= 3) {
        values.add(sp_data[2].value)
      }
    })
  }
  return Array.from(values)
}

// 动态渲染的table中的值
const getProductSkuVal = (row, index) => {
  const sp_data = JSON.parse(row.sp_data)
  if (sp_data !== null && index < sp_data.length) {
    return sp_data[index].value
  } else {
    return null
  }
}
// 将input_list转为数组
const getInputListArr = (inputList) => {
  return inputList.split(',')
}
// 删除商品属性
const handleRemoveProductAttr = (index, idx, item) => {
  selectProductAttr.value[index].options.splice(idx, 1)
  // 将选中的值同步删除
  selectProductAttr.value[index].values.forEach((x, i) => {
    if (x === item) {
      selectProductAttr.value[index].values.splice(i, 1)
    }
  })
}
const addProductAttr = ref('') // 手动新增商品属性
// 手动新增商品属性
const handleAddProductAttr = (index) => {
  const options = selectProductAttr.value[index].options
  if (!addProductAttr.value) {
    return ElMessage.warning('属性值不能为空')
  }
  if (options.indexOf(addProductAttr.value) !== -1) {
    return ElMessage.warning('属性值不能重复')
  }
  selectProductAttr.value[index].options.push(addProductAttr.value)
  addProductAttr.value = null
}

// 刷新列表
const refreshList = () => {
  ElMessageBox.confirm('刷新列表将导致sku信息重新生成，是否确定？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    formData.value.skuTableData = []
    const skuList = formData.value.skuTableData
    if (selectProductAttr.value.length === 1) {
      const attr = selectProductAttr.value[0]
      attr.values.forEach((item, index) => {
        skuList.push({
          sp_data: JSON.stringify([
            { key: attr.name, value: attr.values[index] }
          ])
        })
      })
    } else if (selectProductAttr.value.length === 2) {
      const attr0 = selectProductAttr.value[0]
      const attr1 = selectProductAttr.value[1]
      for (let i = 0; i < attr0.values.length; i++) {
        if (attr1.values.length === 0) {
          skuList.push({
            sp_data: JSON.stringify([
              { key: attr0.name, value: attr0.values[i] }
            ])
          })
          continue
        }
        for (let j = 0; j < attr1.values.length; j++) {
          const sp_data = []
          sp_data.push({ key: attr0.name, value: attr0.values[i] })
          sp_data.push({ key: attr1.name, value: attr1.values[j] })
          skuList.push({
            sp_data: JSON.stringify(sp_data)
          })
        }
      }
    } else if (selectProductAttr.value.length === 3) {
      const attr0 = selectProductAttr.value[0]
      const attr1 = selectProductAttr.value[1]
      const attr2 = selectProductAttr.value[2]
      for (let i = 0; i < attr0.values.length; i++) {
        if (attr1.values.length === 0) {
          skuList.push({
            sp_data: JSON.stringify([
              { key: attr0.name, value: attr0.values[i] }
            ])
          })
          continue
        }
        for (let j = 0; j < attr1.values.length; j++) {
          if (attr2.values.length === 0) {
            const sp_data = []
            sp_data.push({ key: attr0.name, value: attr0.values[i] })
            sp_data.push({ key: attr1.name, value: attr1.values[j] })
            skuList.push({
              sp_data: JSON.stringify(sp_data)
            })
            continue
          }
          for (let k = 0; k < attr2.values.length; k++) {
            const sp_data = []
            sp_data.push({ key: attr0.name, value: attr0.values[i] })
            sp_data.push({ key: attr1.name, value: attr1.values[j] })
            sp_data.push({ key: attr2.name, value: attr2.values[k] })
            skuList.push({
              sp_data: JSON.stringify(sp_data)
            })
          }
        }
      }
    }
    refreshProductAttrPics()
  })
}
// 删除商品sku
const handleRemoveProductSku = (index, row) => {
  formData.value.skuTableData.splice(index, 1)
}
// 同步价格
const handleSyncPrice = () => {
  if (formData.value.skuTableData && formData.value.skuTableData.length > 0) {
    const price = formData.value.skuTableData[0].price
    formData.value.skuTableData.forEach((item) => {
      item.price = price
    })
  }
}
// 同步库存
const handleSyncSku = () => {
  if (formData.value.skuTableData && formData.value.skuTableData.length > 0) {
    const stock = formData.value.skuTableData[0].stock
    const lowStock = formData.value.skuTableData[0].low_stock
    formData.value.skuTableData.forEach((item) => {
      item.stock = stock
      item.low_stock = lowStock
    })
  }
}

/**
 * 商品属性图片
 */
const selectProductAttrPics = ref([]) // 选中的商品属性图片
const hasAttrPic = computed(() => {
  if (selectProductAttrPics.value.length < 1) {
    return false
  }
  return true
})
const refreshProductAttrPics = () => {
  selectProductAttrPics.value = []
  if (selectProductAttr.value.length >= 1) {
    const values = selectProductAttr.value[0].values
    for (let i = 0; i < values.length; i++) {
      const pic = null
      // if (isEdit.value) {
      //   pic =
      // }
      selectProductAttrPics.value.push({ name: values[i], pic })
    }
  }
}

// 合并商品属性
const mergeProductAttr = () => {
  formData.value.productAttributeValueList = []
  selectProductAttr.value.forEach((item, index) => {
    const attr = selectProductAttr.value[index]
    if (attr.hand_add_status === 2 && attr.options && attr.options.length > 0) {
      formData.value.productAttributeValueList.push({
        product_attribute_id: attr.id,
        value: getOptionStr(attr.options)
      })
    }
  })
  selectProductParam.value.forEach((item, index) => {
    const param = selectProductParam.value[index]
    formData.value.productAttributeValueList.push({
      product_attribute_id: param.id,
      value: param.value
    })
  })
}
// 将options转为字符串并拼接
const getOptionStr = (arr) => {
  let str = ''
  arr.forEach((item, index) => {
    str += arr[index]
    if (index !== arr.length - 1) {
      str += ','
    }
  })
  return str
}

const submit = () => {
  mergeProductAttr()
}

defineExpose({
  submit,
  formData,
  selectProductAttr,
  selectProductParam,
  selectProductAttrPics
})
</script>

<style lang='scss' scoped>
.form-data {
  width: 720px;
  margin: 20px 0;
}
.el-input,
.el-select,
.el-textarea {
  width: 500px;
}

.product-spec-table {
  margin: 10px 0 0 0;
  .el-input {
    width: 80px;
  }
}

.attr-select {
  display: flex;
  flex-wrap: wrap;
}
.remove-attr {
  margin: 0 15px 0 5px;
}
.add-attr-input {
  width: 130px;
  margin: 0 10px 0 0;
}
.table-btn {
  margin: 10px 0 0 0;
}
.single-upload {
  width: 300px;
  display: inline-block;
  margin: 0 0 0 10px;
}
.card-pro-param {
  .el-input, .el-select {
    width: 280px;
  }
}
</style>
