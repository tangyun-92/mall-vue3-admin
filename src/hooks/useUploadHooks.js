import { ElMessage } from 'element-plus'
import { reactive } from 'vue'

export default function () {
  const uploadData = reactive({
    imageUrl: ''
  })

  // 上传成功
  const uploadSuccess = (res, file) => {
    ElMessage.success(res.message)
    uploadData.imageUrl = res.url
  }

  // 上传之前的钩子
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }

  return {
    uploadData,
    uploadSuccess,
    beforeUpload
  }
}
