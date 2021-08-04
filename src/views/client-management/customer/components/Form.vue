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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model.trim="formData.username"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input
          v-model.trim="formData.wechat"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input
          v-model.trim="formData.tel"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="会员等级" prop="level_id">
        <el-select v-model="formData.level_id" placeholder="请选择" clearable>
          <el-option
            v-for="item in levelData"
            :key="item.id"
            :label="item.level"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ifEnable } from '@/constants/dictionary'
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditCustomer } from '@/api/client-management/customer'
import { ElMessage } from 'element-plus'
import { getLevel } from '@/api/client-management/level'

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
    // 角色数据
    const levelData = ref('')
    // 表单数据
    const formData = reactive({
      username: '',
      wechat: '',
      tel: '',
      level_id: null,
      id: null
    })
    // 校验规则
    const rules = {
      username: [{ required: true, message: '不能为空', trigger: 'blur' }]
    }

    onMounted(() => {
      Object.keys(formData).forEach(key => {
        formData[key] = props.data[key]
      })
      getLevelList()
    })

    // 获取会员等级列表
    const getLevelList = async () => {
      const res = await getLevel({
        page: 1,
        pageSize: 100
      })
      levelData.value = res.data.records
    }

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async valid => {
          if (valid) {
            const res = await createOrEditCustomer({
              ...formData,
              level_id: formData.level_id ? formData.level_id : null
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
      ifEnable,
      submit,
      formData,
      formRef,
      levelData
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
