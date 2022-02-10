<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-vail-config'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })
    // 拿到表单的值准备做验证
    const formRef = ref<InstanceType<typeof ElForm>>()
    /**验证登录
     * @returns {boolean} 返回一个布尔值
     */
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('zhixing')
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped></style>
