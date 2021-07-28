import { reactive } from 'vue'

export default function ({ formDataDefault }) {
  const dialogData = reactive({
    formDialogVisible: false,
    dialogStatus: '',
    dialogTitle: '',
    formData: {}
  })

  const handleCreate = () => {
    dialogData.formDialogVisible = true
    dialogData.dialogStatus = 'create'
    dialogData.dialogTitle = '新增'
    Object.assign(dialogData.formData, formDataDefault)
  }

  const handleUpdate = (row) => {
    dialogData.formData = JSON.parse(JSON.stringify(row))
    dialogData.formDialogVisible = true
    dialogData.dialogStatus = 'edit'
    dialogData.dialogTitle = '编辑'
  }

  const handleDetails = (row) => {
    dialogData.formData = JSON.parse(JSON.stringify(row))
    dialogData.formDialogVisible = true
    dialogData.dialogStatus = 'details'
    dialogData.dialogTitle = '查看'
  }

  return {
    dialogData,
    handleCreate,
    handleUpdate,
    handleDetails
  }
}
