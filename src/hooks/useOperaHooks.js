import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default function ({ formDataDefault, getTableList, page }) {
  const dialogData = reactive({
    formDialogVisible: false,
    dialogStatus: '',
    dialogTitle: '',
    formData: {}
  })
  const multipleSelection = ref([])
  const loading = ref(false)

  const selectIds = computed(() => {
    return multipleSelection.value.map((item) => item.id)
  })

  // 新增
  const handleCreate = () => {
    dialogData.formDialogVisible = true
    dialogData.dialogStatus = 'create'
    dialogData.dialogTitle = '新增'
    Object.assign(dialogData.formData, formDataDefault)
  }

  // 编辑
  const handleUpdate = (row) => {
    dialogData.formData = JSON.parse(JSON.stringify(row))
    dialogData.formDialogVisible = true
    dialogData.dialogStatus = 'edit'
    dialogData.dialogTitle = '编辑'
  }

  // 查看详情
  const handleDetails = (row) => {
    dialogData.formData = JSON.parse(JSON.stringify(row))
    dialogData.formDialogVisible = true
    dialogData.dialogStatus = 'details'
    dialogData.dialogTitle = '查看'
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
    dialogData,
    handleCreate,
    handleUpdate,
    handleDetails,
    handleSelectionChange,
    multipleSelectionHandler,
    selectIds
  }
}
