/*
 * @Author: 唐云
 * @Date: 2021-10-12 11:05:33
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-22 15:15:02
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
            <SingleUpload v-model="item.pic" class="single-upload" :name="item.name" @input="handleInput" />
          </div>
        </el-card>
      </el-form-item>
      <!-- 商品参数 -->
      <el-form-item label="商品参数:">
        <el-card shadow="never" class="card-pro-param">
          <div v-for="(item, index) in selectProductParam" :key="item.id">
            <el-form-item :label="item.name + ':'">
              <el-select
                v-if="item.input_type === 2 && item.select_type === 2"
                v-model="selectProductParam[index].value"
              >
                <el-option
                  v-for="val in getInputListArr(item.input_list)"
                  :key="val"
                  :label="val"
                  :value="val"
                ></el-option>
              </el-select>
              <el-select
                v-if="item.input_type === 2 && item.select_type === 3"
                v-model="selectProductParam[index].value"
                multiple
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
      <!-- 商品相册 -->
      <el-form-item label="商品相册:">
        <MultiUpload v-model="selectProductPics" :max-count="5" @input="handlePicsInput" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getGoodsAttributeCategoryMap } from '@/api/good/attribute-category'
import { getGoodsAttribute } from '@/api/good/attribute'
import { computed, defineProps, onMounted, ref, defineExpose } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import SingleUpload from '@/components/SingleUpload/index.vue'
import MultiUpload from '@/components/MultiUpload/index.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  },
  editId: null
})

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
  // console.log(formData.value.skuTableData)
  formData.value.skuTableData.forEach(item => {
    console.log(JSON.parse(item.sp_data))
    selectProductAttrPics.value.push({
      name: JSON.parse(item.sp_data)[0].value,
      pic: item.pic
    })
    const obj = {}
    selectProductAttrPics.value = selectProductAttrPics.value.reduce((item, next) => {
      obj[next.name] ? '' : obj[next.name] = true && item.push(next)
      return item
    }, [])
    console.log(selectProductAttrPics.value)
  })
  // refreshProductAttrPics()
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
        product_attribute_id: listAttr[i].id,
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
            id = formData.value.productAttributeValueList[index].id
            if (listParam[i].select_type === 3) {
              value = value.split(',')
            }
          }
        })
      }
      selectProductParam.value.push({
        id,
        product_attribute_id: listParam[i].id,
        name: listParam[i].name,
        value,
        input_type: listParam[i].input_type,
        select_type: listParam[i].select_type,
        input_list: listParam[i].input_list
      })
    }
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

function getGroupResult(dataList) {
  return dataList.reduce((r, { name, value }) => {
    r[name] = r[name] || []
    r[name].push(value)
    return r
  }, {})
}
function combination(groupInfo) {
  return Object.entries(groupInfo).reduce((result, [key, valueList]) => {
    return valueList.reduce((subResult, value) => {
      const tail = result.map(i => ({ ...i, [key]: value }))
      return subResult.concat(tail)
    }, [])
  }, [{}])
}

// 刷新列表
const refreshList = () => {
  ElMessageBox.confirm('刷新列表将导致sku信息重新生成，是否确定？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const skuList = formData.value.skuTableData
    const newArr = []
    selectProductAttr.value.forEach((item) => {
      item.values.forEach(val => {
        newArr.push({
          name: item.name,
          value: val
        })
      })
    })
    const group = getGroupResult(newArr)
    const result = combination(group)
    result.forEach((item) => {
      const data = Object.keys(item).map(r => ({ key: r, value: item[r] }))
      skuList.push({ sp_data: JSON.stringify(data) })
    })
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
  if (formData.value.skuTableData.length < 1) {
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
      selectProductAttrPics.value.push({ name: values[i], pic })
    }
  }
}
// 商品属性图片上传回调
const handleInput = (val) => {
  selectProductAttrPics.value.forEach(item => {
    if (item.name === val.colorName) {
      item.pic = val.url
    }
  })
}
// 获取商品相关属性的图片
const getProductSkuPic = (name) => {
  for (let i = 0; i < formData.value.skuTableData.length; i++) {
    console.log(formData.value)
    const sp_data = JSON.parse(formData.value.skuTableData[i].sp_data)
    if (name === sp_data[0].value) {
      return formData.value.skuTableData[i].pic
    }
  }
  return null
}

// 合并商品属性
const mergeProductAttr = () => {
  formData.value.productAttributeValueList = []
  selectProductAttr.value.forEach((item, index) => {
    const attr = selectProductAttr.value[index]
    if (attr.hand_add_status === 2 && attr.options && attr.options.length > 0) {
      formData.value.productAttributeValueList.push({
        product_attribute_id: attr.product_attribute_id,
        value: getOptionStr(attr.options)
      })
    }
  })
  selectProductParam.value.forEach((item, index) => {
    const param = selectProductParam.value[index]
    formData.value.productAttributeValueList.push({
      product_attribute_id: param.product_attribute_id,
      id: param.id ? param.id : null,
      value: param.select_type === 3 ? getOptionStr(param.value) : param.value
    })
  })
}
// 合并商品图片
const mergeProductPics = () => {
  console.log(selectProductAttrPics.value)
  for (let i = 0; i < selectProductAttrPics.value.length; i++) {
    for (let j = 0; j < formData.value.skuTableData.length; j++) {
      const sp_data = JSON.parse(formData.value.skuTableData[j].sp_data)
      if (sp_data[0].value === selectProductAttrPics.value[i].name) {
        console.log(selectProductAttrPics.value[i].pic)
        formData.value.skuTableData[j].pic = selectProductAttrPics.value[i].pic
      }
    }
  }
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

/**
 * 商品的主图和画册图片
 */
const selectProductPics = computed({
  get() {
    const pics = []
    if (!formData.value.album_pics) {
      return pics
    }
    const albumPics = formData.value.album_pics.split(',')
    formData.value.pic = albumPics[0]
    albumPics.forEach((item) => {
      pics.push(item)
    })
    return pics
  },
  set(newValue) {
    if (newValue === null || newValue.length === 0) {
      formData.value.pic = null
      formData.value.album_pics = null
    } else {
      formData.value.pic = newValue[0]
      formData.value.album_pics = ''
      if (newValue.length >= 1) {
        for (let i = 0; i < newValue.length; i++) {
          formData.value.album_pics += newValue[i]
          if (i !== newValue.length - 1) {
            formData.value.album_pics += ','
          }
        }
      }
    }
  }
})
// 商品的主图和画册图片上传回调
const handlePicsInput = (fileList) => {
  selectProductPics.value = fileList
}

// 点击下一步时合并属性与图片
const submit = () => {
  mergeProductAttr()
  mergeProductPics()
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
