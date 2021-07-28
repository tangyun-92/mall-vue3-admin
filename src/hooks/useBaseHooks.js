import { reactive, onMounted } from 'vue'

/**
 *
 * @param {*} reqFn 请求的方法
 * @param {*} searchData 搜索的数据
 * @returns
 */
export default function ({ reqFn, searchData }) {
  const data = reactive({
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  })

  /**
   * 获取table表格数据
   */
  const getTableList = async () => {
    const res = await reqFn({
      page: data.currentPage,
      pageSize: data.pageSize,
      ...searchData
    })
    data.tableData = res.data.records
    data.total = res.data.total
    data.currentPage = res.data.page
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

  onMounted(() => {
    getTableList()
  })

  return {
    data,
    handleSizeChange,
    handleCurrentChange,
    getTableList
  }
}
