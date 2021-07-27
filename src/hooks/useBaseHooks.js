import { reactive, onMounted } from 'vue'

export default function ({ reqFn, searchData }) {
  const data = reactive({
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 5
  })

  console.log(searchData)

  const getTableList = async () => {
    const res = await reqFn({
      page: data.currentPage,
      pageSize: data.pageSize,
      ...searchData
    })
    data.tableData = res.data.records
    data.total = res.data.total
    data.currentPage = res.data.page
    console.log(res)
  }

  const handleSizeChange = (pageSize) => {
    console.log(pageSize, 'p')
    data.pageSize = pageSize
    getTableList()
  }

  const handleCurrentChange = (currentPage) => {
    console.log(currentPage, 'c')
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
