import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default function ({ reqFn }) {
  const store = useStore()
  const uploadData = reactive({
    imageUrl: ''
  })
  const fileList = ref([])
  const upload = ref(null)

  const token = computed(() => store.state.user.token)

  // 选择文件时
  const uploadChange = (list) => {
    fileList.value.push(list)
  }

  // 移除文件时
  const uploadRemove = (file) => {
    const arr = []
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].url !== file.url) {
        arr.push(fileList.value[i])
      }
    }
    fileList.value = arr
  }

  // 手动上传
  const submitUpload = () => {
    if (fileList.value.length === 0) {
      return ElMessage.warning('请选择文件')
    }
    const formData = new FormData()
    fileList.value.forEach((file) => {
      if (!file.raw && file.url.indexOf('blob') === -1) {
        //
      } else {
        formData.append('file', file.raw)
        formData.append('col', fileList.value.length)
      }
    })

    reqFn(formData)
      .then((res) => {
        if (res.result) {
          ElMessage.success(res.message)
          res.url.forEach((item) => {
            fileList.value.push({ url: item.url })
          })
          fileList.value = fileList.value.filter(item => !item.name)
        }
      })
      .catch((err) => {
        ElMessage.error('上传失败，请重新上传')
        console.log(err)
      })
  }

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

  const uploadExceed = (files, fileList) => {
    ElMessage.warning(
      `当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
        files.length + fileList.length
      } 个文件`
    )
  }

  return {
    token,
    uploadData,
    uploadSuccess,
    beforeUpload,
    uploadExceed,
    fileList,
    submitUpload,
    uploadChange,
    uploadRemove
  }
}
