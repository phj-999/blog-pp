import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElContainer
} from 'element-plus'

const components = [
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElContainer
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
