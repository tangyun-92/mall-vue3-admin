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
      <el-form-item label="所属员工id" prop="emp_id">
        <el-input
          v-model.trim="formData.emp_id"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="role_id">
        <el-select v-model="formData.role_id" placeholder="请选择" clearable>
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.role"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in ifEnable"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
import { createOrEditUser } from '@/api/system/user'
import { getRole } from '@/api/system/role'
import { ElMessage } from 'element-plus'

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
    const roleData = ref('')
    // 表单数据
    const formData = reactive({
      username: '',
      status: '',
      role_id: '',
      emp_id: '',
      id: null
    })
    // 校验规则
    const rules = {
      username: [{ required: true, message: '不能为空', trigger: 'blur' }],
      emp_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
      role_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      status: [{ required: true, message: '不能为空', trigger: 'change' }]
    }

    onMounted(() => {
      Object.keys(formData).forEach(key => {
        formData[key] = props.data[key]
      })
      getRoleList()
    })

    // 获取角色列表
    const getRoleList = async () => {
      const res = await getRole({
        page: 1,
        pageSize: 100
      })
      roleData.value = res.data.records
    }

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async valid => {
          if (valid) {
            const res = await createOrEditUser({
              ...formData,
              emp_id: Number(formData.emp_id)
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
      roleData
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
