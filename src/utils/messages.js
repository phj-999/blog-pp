import { ElMessage } from 'element-plus'
class Messages {
  constructor(text) {
    this.text = text
  }
  error(mserr) {
    ElMessage({
      showClose: true,
      message: mserr,
      type: 'error'
    })
  }
  success() {
    ElMessage({
      showClose: true,
      message: 'success',
      type: 'success'
    })
  }
}
export default Messages
