import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default function ({ formDataDefault, getTableList, page }) {
  const operaData = reactive({
    formDialogVisible: false,
    dialogStatus: '',
    dialogTitle: '',
    formData: {}
  })
  // table复选框数据
  const multipleSelection = ref([])
  const loading = ref(false)

  // 选中数据id组成的数组，传递给后端
  const selectIds = computed(() => {
    return multipleSelection.value.map((item) => item.id)
  })

  // 新增
  const handleCreate = () => {
    operaData.formDialogVisible = true
    operaData.dialogStatus = 'create'
    operaData.dialogTitle = '新增'
    Object.assign(operaData.formData, formDataDefault)
  }

  // 编辑
  const handleUpdate = (row) => {
    operaData.formData = JSON.parse(JSON.stringify(row))
    operaData.formDialogVisible = true
    operaData.dialogStatus = 'edit'
    operaData.dialogTitle = '编辑'
  }

  // 查看详情
  const handleDetails = (row) => {
    operaData.formData = JSON.parse(JSON.stringify(row))
    operaData.formDialogVisible = true
    operaData.dialogStatus = 'details'
    operaData.dialogTitle = '查看'
  }

  // 表格复选框赋值
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  /**
   * 处理启用、停用、删除、清空等操作
   * @param {*} operation 操作名
   * @param {*} reqFn 请求方法名
   * @param {*} data 传递给后端的数据
   * @param {*} success 成功后执行的方法，默认为getTableList
   * @param {*} single 是否操作的单条数据，默认为false
   */
  const multipleSelectionHandler = ({
    operation,
    reqFn,
    data,
    success,
    single = false
  }) => {
    if (multipleSelection.value.length === 0 && !single) {
      ElMessage.warning('请先选中数据')
    } else {
      ElMessageBox.confirm(`是否对选中数据执行${operation}操作`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          loading.value = true
          await reqFn(data)
          ElMessage.success(`${operation}成功`)
          ;(success && success()) || getTableList(page)
          loading.value = false
        })
        .catch(() => {
          ElMessage.info(`已取消${operation}`)
        })
    }
  }

  return {
    operaData,
    handleCreate,
    handleUpdate,
    handleDetails,
    handleSelectionChange,
    multipleSelectionHandler,
    selectIds
  }
}
