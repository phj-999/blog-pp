import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
} from 'element-plus'

const components = [
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
