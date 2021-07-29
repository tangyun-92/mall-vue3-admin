/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 15:33:47
 */
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
      :disabled="status === 'details'"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="ename">
            <el-input
              v-model.trim="formData.ename"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工号" prop="wid">
            <el-input
              v-model.trim="formData.wid"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formData.sex" placeholder="请选择" clearable>
              <el-option
                v-for="item in sex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚否" prop="married">
            <el-select v-model="formData.married" placeholder="请选择" clearable>
              <el-option
                v-for="item in ifMarried"
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
          <el-form-item label="学历" prop="education">
            <el-select v-model="formData.education" placeholder="请选择" clearable>
              <el-option
                v-for="item in education"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="tel">
            <el-input
              v-model.trim="formData.tel"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model.trim="formData.email"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input
              v-model.trim="formData.address"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="职位" prop="job_id">
            <el-select v-model="formData.job_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in job"
                :key="item.id"
                :label="item.job"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="dept_id">
            <el-select v-model="formData.dept_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in department"
                :key="item.id"
                :label="item.dname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上司id" prop="mgr_id">
            <el-input
              v-model.trim="formData.mgr_id"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formData.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in ifJobStatus"
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
          <el-form-item label="入职日期" prop="hiredate">
            <el-date-picker
              v-model="formData.hiredate"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离职日期" prop="termdate">
            <el-date-picker
              v-model="formData.termdate"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditEmployee } from '@/api/employee/employee'
import { ElMessage } from 'element-plus'
import { sex, ifMarried, education, ifJobStatus } from '@/constants/dictionary'
import { getJob } from '@/api/employee/job'
import { getDepartment } from '@/api/employee/department'

export default defineComponent({
  name: 'EmployeeForm',
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
    const job = ref([])
    const department = ref([])
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      wid: '',
      ename: '',
      sex: '',
      married: '',
      education: '',
      tel: '',
      email: '',
      address: '',
      job_id: '',
      dept_id: '',
      mgr_id: null,
      hiredate: '',
      termdate: null,
      status: '',
      id: null
    })
    // 校验规则
    const rules = {
      wid: [{ required: true, message: '不能为空', trigger: 'blur' }],
      ename: [{ required: true, message: '不能为空', trigger: 'blur' }],
      sex: [{ required: true, message: '不能为空', trigger: 'change' }],
      married: [{ required: true, message: '不能为空', trigger: 'change' }],
      education: [{ required: true, message: '不能为空', trigger: 'change' }],
      tel: [{ required: true, message: '不能为空', trigger: 'blur' }],
      job_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      dept_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      hiredate: [{ required: true, message: '不能为空', trigger: 'change' }],
      status: [{ required: true, message: '不能为空', trigger: 'blur' }]
    }

    onMounted(() => {
      Object.keys(formData).forEach(key => {
        formData[key] = props.data[key]
      })
      getJobList()
      getDepartmentList()
    })

    // 职位列表
    const getJobList = async () => {
      const res = await getJob({
        page: 1,
        pageSize: 100
      })
      job.value = res.data.records
    }
    // 部门列表
    const getDepartmentList = async () => {
      const res = await getDepartment({
        page: 1,
        pageSize: 100
      })
      department.value = res.data.records
    }

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async valid => {
          if (valid) {
            const res = await createOrEditEmployee(formData)
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
      sex,
      ifMarried,
      education,
      ifJobStatus,
      job,
      department
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
