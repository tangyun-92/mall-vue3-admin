/*
 * @Author: 唐云
 * @Date: 2021-10-12 09:56:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-22 15:14:45
 商品促销
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :rules="rules"
      :model="formData"
      label-width="120px"
      class="form-data"
      size="small"
    >
      <el-form-item label="赠送积分" prop="gift_point">
        <el-input v-model="formData.gift_point" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="赠送成长值" prop="gift_growth">
        <el-input
          v-model="formData.gift_growth"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="限制使用积分数" prop="use_point_limit">
        <el-input
          v-model="formData.use_point_limit"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否为预告商品" prop="preview_status">
        <el-radio-group v-model="formData.preview_status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上架状态" prop="publish_status">
        <el-radio-group v-model="formData.publish_status">
          <el-radio :label="2">上架</el-radio>
          <el-radio :label="1">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="新品状态" prop="new_status">
        <el-radio-group v-model="formData.new_status">
          <el-radio :label="2">新品</el-radio>
          <el-radio :label="1">不是新品</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐状态" prop="recommend_status">
        <el-radio-group v-model="formData.recommend_status">
          <el-radio :label="2">推荐</el-radio>
          <el-radio :label="1">不推荐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务保证" prop="service_ids">
        <el-checkbox-group v-model="formData.service_ids">
          <el-checkbox
            v-for="item in productService"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="详细页标题" prop="detail_title">
        <el-input
          v-model="formData.detail_title"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细页描述" prop="detail_desc">
        <el-input
          v-model="formData.detail_desc"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品关键字" prop="keywords">
        <el-input v-model="formData.keywords" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品备注" prop="note">
        <el-input
          v-model="formData.note"
          type="textarea"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择优惠方式" prop="promotion_type">
        <el-radio-group
          v-model="formData.promotion_type"
          @change="changePromotionType"
        >
          <el-radio-button
            v-for="item in promotionType"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 特惠促销 -->
      <div v-if="currentPromotionType === 2" class="promotion">
        <el-form-item label="开始时间" prop="promotion_start_time">
          <el-date-picker
            v-model="formData.promotion_start_time"
            type="datetime"
            placeholder="请选择"
            value-format="YYYY-MM-DD hh:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="promotion_end_time">
          <el-date-picker
            v-model="formData.promotion_end_time"
            type="datetime"
            placeholder="请选择"
            value-format="YYYY-MM-DD hh:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="促销价格" prop="promotion_price">
          <el-input
            v-model="formData.promotion_price"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 阶梯价格 -->
      <div v-if="currentPromotionType === 4" class="ladder">
        <el-table style="width:100%;" :data="formData.ladderTableData">
          <el-table-column label="满足商品数量">
            <template #default="scope">
              <el-input v-model="scope.row.count" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="折扣">
            <template #default="scope">
              <el-input v-model="scope.row.discount" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template #default="scope">
              <el-button type="text" size="small" @click="handleDeleteLadder(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="handleAddLadder">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 满减价格 -->
      <div v-if="currentPromotionType === 5" class="ladder">
        <el-table style="width:100%;" :data="formData.fullReduceTableData">
          <el-table-column label="满足金额">
            <template #default="scope">
              <el-input v-model="scope.row.full_price" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="立减金额">
            <template #default="scope">
              <el-input v-model="scope.row.reduce_price" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template #default="scope">
              <el-button type="text" size="small" @click="handleDeleteFullReduce(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="handleAddFullReduce">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, ref, defineExpose, computed, onMounted } from 'vue'
import { productService, promotionType } from '@/constants/dictionary'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  },
  editId: null
})

const formRef = ref(null)
const rules = {
  publish_status: [{ required: true, message: '不能为空', trigger: 'change' }],
  new_status: [{ required: true, message: '不能为空', trigger: 'change' }],
  recommend_status: [{ required: true, message: '不能为空', trigger: 'change' }]
}

const formData = computed(() => {
  return props.modelValue
})

onMounted(() => {
  changePromotionType(formData.value.promotion_type)
  if (formData.value.ladderTableData.length === 0) {
    formData.value.ladderTableData.push({ count: 0, discount: 0 })
  }
  if (formData.value.fullReduceTableData.length === 0) {
    formData.value.fullReduceTableData.push({ full_price: 0, reduce_price: 0 })
  }
})

/**
 * 优惠方式
 */
// 选中的优惠方式
const currentPromotionType = ref(null)
// 切换优惠方式
const changePromotionType = (val) => {
  currentPromotionType.value = val
}

/**
 * 阶梯价格
 */
// 删除阶梯价格
const handleDeleteLadder = (index, row) => {
  if (formData.value.ladderTableData.length > 1) {
    formData.value.ladderTableData.splice(index, 1)
  } else {
    ElMessage.warning('无法删除最后一条数据！')
  }
}
// 添加阶梯价格
const handleAddLadder = () => {
  formData.value.ladderTableData.push({
    count: 0,
    discount: 0
  })
}

/**
 * 满减价格
 */
// 删除满减价格
const handleDeleteFullReduce = (index, row) => {
  if (formData.value.fullReduceTableData.length > 1) {
    formData.value.fullReduceTableData.splice(index, 1)
  } else {
    ElMessage.warning('无法删除最后一条数据！')
  }
}
// 添加满减价格
const handleAddFullReduce = () => {
  formData.value.fullReduceTableData.push({
    full_price: 0,
    reduce_price: 0
  })
}

const submit = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid) => {
      if (valid) {
        resolve()
      } else {
        reject('表单校验未通过')
      }
    })
  })
}

defineExpose({
  formData,
  submit
})
</script>

<style lang='scss' scoped>
.form-data {
  width: 650px;
  margin: 20px auto;
}
.el-input,
.el-select,
.el-textarea {
  width: 500px;
}
.promotion {
  width: 450px;
  margin: 0 auto;
  .el-input {
    width: 220px;
  }
}
.ladder {
  width: 450px;
  margin: 0 auto;
  .el-input {
    width: 100%;
  }
}
</style>
