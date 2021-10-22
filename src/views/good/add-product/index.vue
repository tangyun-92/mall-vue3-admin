/*
 * @Author: 唐云
 * @Date: 2021-10-11 16:40:06
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-22 14:08:11
 新增商品
 */
<template>
  <div class="home-view">
    <div class="table-container">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品促销"></el-step>
        <el-step title="填写商品属性"></el-step>
        <el-step title="选择商品关联"></el-step>
      </el-steps>
      <div class="main">
        <div v-if="active === 0">
          <Info ref="infoRef" v-model="productDetail" :edit-id="editId" />
        </div>
        <div v-if="active === 1">
          <Promotion
            ref="promotionRef"
            v-model="productDetail"
            :edit-id="editId"
          />
        </div>
        <div v-if="active === 2">
          <Attribute
            ref="attributeRef"
            v-model="productDetail"
            :edit-id="editId"
          />
        </div>
        <div v-if="active === 3">商品关联</div>
      </div>
      <div class="btn">
        <el-button
          v-if="active !== 0"
          style="margin-top: 12px"
          @click="prev"
        >上一步</el-button>
        <el-button
          v-if="active !== 3"
          style="margin-top: 12px"
          type="primary"
          @click="next"
        >下一步</el-button>
        <el-button
          v-if="active === 3"
          style="margin-top: 12px"
          type="primary"
          @click="submit"
        >提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Info from './components/info.vue'
import Promotion from './components/promotion.vue'
import Attribute from './components/attribute.vue'
import { createOrEditProduct, getProductDetail } from '@/api/good/product'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const store = useStore()

const editId = ref(null)
onMounted(() => {
  editId.value = route.query.id
  if (editId.value) {
    getProDetail()
  }
})

const productDetail = reactive({
  name: '',
  product_category_id: null,
  sub_title: '',
  brand_id: null,
  description: '',
  product_sn: '',
  price: null,
  original_price: null,
  stock: null,
  unit: '',
  weight: null,
  sort: null,
  gift_point: null,
  gift_growth: null,
  use_point_limit: null,
  preview_status: null,
  publish_status: null,
  new_status: null,
  recommend_status: null,
  service_ids: [],
  detail_title: '',
  detail_desc: '',
  keywords: '',
  note: '',
  pic: '',
  album_pics: '',
  promotion_type: null,
  promotion_start_time: '',
  promotion_end_time: '',
  promotion_price: null,
  product_attribute_category_id: null, // 属性类型
  skuTableData: [], // sku库存 table 数据
  productAttributeValueList: [] // 商品属性值列表
})

const getProDetail = () => {
  getProductDetail({ id: editId.value }).then((res) => {
    Object.assign(productDetail, res.data.records)
    productDetail.service_ids = productDetail.service_ids
      ? productDetail.service_ids.split(',')
      : []
  })
}

// 商品信息ref
const infoRef = ref(null)
// 商品促销ref
const promotionRef = ref(null)
// 商品属性ref
const attributeRef = ref(null)

// 枚举商品信息、促销、属性、关联
const ProductEnum = {
  info: 0,
  promotion: 1,
  attribute: 2,
  relevance: 3
}
const active = ref(0)
// 下一步
const next = () => {
  const productInfo = store.state.baseData.productInfo
  // 填写商品信息
  if (active.value === ProductEnum.info) {
    infoRef.value.submit().then(() => {
      active.value++
      console.log(productDetail, 'productDetail')
    })
  } else if (active.value === ProductEnum.promotion) {
    // 填写商品促销
    promotionRef.value.submit().then(() => {
      active.value++
      console.log(productDetail, 'productDetail')
    })
  } else if (active.value === ProductEnum.attribute) {
    attributeRef.value.submit()
    // 填写商品属性
    console.log(productDetail, 'productDetail')
    active.value++
  }
}
// 上一步
const prev = () => {
  active.value--
}
// 提交
const submit = () => {
  createOrEditProduct({
    ...productDetail,
    service_ids: productDetail.service_ids.join(',')
  }).then((res) => {
    ElMessage.success(res.message)
    router.push('/good/product')
  })
}
</script>

<style lang='scss' scoped>
.table-container {
  padding: 30px 0;
}
.btn {
  text-align: center;
}
</style>
