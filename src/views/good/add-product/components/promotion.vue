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
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, ref, defineExpose, computed, onMounted } from 'vue'
import { productService, promotionType } from '@/constants/dictionary'

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
</style>
