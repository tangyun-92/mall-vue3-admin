import { reactive, onMounted, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 *
 * @param {*} reqFn 请求的方法
 * @param {*} searchData 搜索的数据
 * @returns
 */
export default function ({ reqFn, searchData, formDataDefault }) {
  const data = reactive({
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
    loading: false,
    formDialogVisible: false,
    dialogStatus: '',
    dialogTitle: '',
    formData: {},
    param: {}
  })
  const multipleSelection = ref([])

  // 选中数据id组成的数组，传递给后端
  const selectIds = computed(() => {
    return multipleSelection.value.map((item) => item.id)
  })

  onMounted(() => {
    getTableList()
  })

  /**
   * 获取table表格数据
   */
  const getTableList = async () => {
    data.loading = true
    const res = await reqFn({
      page: data.currentPage,
      pageSize: data.pageSize,
      ...searchData
    })
    data.tableData = res.data.records
    data.total = res.data.total
    data.currentPage = res.data.page
    data.loading = false
  }

  /**
   * 切换每页显示条数
   * @param {*} pageSize
   */
  const handleSizeChange = (pageSize) => {
    data.pageSize = pageSize
    getTableList()
  }

  /**
   * 选择页码
   * @param {*} currentPage
   */
  const handleCurrentChange = (currentPage) => {
    data.currentPage = currentPage
    getTableList(currentPage)
  }

  // 新增
  const handleCreate = () => {
    data.formDialogVisible = true
    data.dialogStatus = 'create'
    data.dialogTitle = '新增'
    data.param = {}
    Object.assign(data.formData, formDataDefault)
  }

  // 编辑
  const handleUpdate = (row) => {
    data.formData = JSON.parse(JSON.stringify(row))
    if (row.param) {
      data.param = JSON.parse(JSON.stringify(row.param))
    }
    data.formDialogVisible = true
    data.dialogStatus = 'edit'
    data.dialogTitle = '编辑'
  }

  // 查看详情
  const handleDetails = (row) => {
    data.formData = JSON.parse(JSON.stringify(row))
    data.formDialogVisible = true
    data.dialogStatus = 'details'
    data.dialogTitle = '查看'
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
          data.loading = true
          await reqFn(data)
          ElMessage.success(`${operation}成功`)
          ;(success && success()) || getTableList(data.currentPage)
          data.loading = false
        })
        .catch(() => {
          ElMessage.info(`已取消${operation}`)
        })
    }
  }

  /**
   * 根据传递的value过滤本地constants数据
   * @param {*} param 需要过滤的参数
   * @param {*} arr 需要比对的数组
   * @returns 过滤后的数据
   */
  const filterConstants = (param, arr) => {
    const res = arr.find(item => item.value === param)
    return res.label
  }

  return {
    data,
    handleSizeChange,
    handleCurrentChange,
    getTableList,
    handleCreate,
    handleUpdate,
    handleDetails,
    handleSelectionChange,
    multipleSelectionHandler,
    selectIds,
    filterConstants
  }
}
