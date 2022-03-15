import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

const components = [ElMessage]

export default function registerElement(app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
