/*
 * @Author: 唐云
 * @Date: 2021-10-25 15:51:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 16:54:29
 商品关联
 */
<template>
  <div style="text-align: center;" class="transfer">
    <!-- 关联专题 -->
    <div class="transfer-box">
      <el-form
        ref="formRef"
        label-width="100px"
        class="form-data"
        size="small"
      >
        <el-form-item label="关联专题:">
          <el-transfer
            v-model="subjectValue"
            style="text-align: left; display: inline-block"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :titles="['待选择', '已选择']"
            :button-texts="['', '']"
            :format="{
              hasChecked: '${checked}/${total}',
            }"
            :data="subjectList"
            :props="subjectProps"
            @change="handleChangeSubject"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
    </div>
    <!-- 关联优选 -->
    <div class="transfer-box">
      <el-form
        ref="formRef"
        label-width="100px"
        class="form-data"
        size="small"
      >
        <el-form-item label="关联优选:">
          <el-transfer
            v-model="preferenceValue"
            style="text-align: left; display: inline-block"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :titles="['待选择', '已选择']"
            :button-texts="['', '']"
            :format="{
              hasChecked: '${checked}/${total}',
            }"
            :data="preferenceList"
            :props="preferenceProps"
            @change="handleChangePreference"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { getPreferenceMap } from '@/api/marketing/preference'
import { getSubjectMap } from '@/api/marketing/subject'
import { onMounted, ref, defineProps, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  },
  editId: null
})
const formData = computed(() => {
  return props.modelValue
})

onMounted(() => {
  getSubjectList()
  getPreferenceList()
  subjectValue.value = formData.value.subjectIds
  preferenceValue.value = formData.value.preferenceIds
})

/**
 * 关联专题
 */
// 专题列表
const subjectList = ref([])
const getSubjectList = () => {
  getSubjectMap().then(res => {
    subjectList.value = res.data.records
  })
}
const subjectProps = ref({
  key: 'id',
  label: 'title'
})
// 已关联的专题
const subjectValue = ref([])
const handleChangeSubject = (value, direction, movedKeys) => {
  subjectValue.value = value
  props.modelValue.subjectIds = value
}

/**
 * 关联优选
 */
// 优选列表
const preferenceList = ref([])
const getPreferenceList = () => {
  getPreferenceMap().then(res => {
    preferenceList.value = res.data.records
  })
}
const preferenceProps = ref({
  key: 'id',
  label: 'name'
})
// 已关联的优选
const preferenceValue = ref([])
const handleChangePreference = (value, direction, movedKeys) => {
  preferenceValue.value = value
  props.modelValue.preferenceIds = value
}

</script>

<style lang='scss' scoped>
.transfer {
  margin: 0 auto;
  width: 700px;

  .transfer-box {
    margin: 40px 0 20px;
  }
}
.el-transfer {
  display: block !important;
}
</style>
