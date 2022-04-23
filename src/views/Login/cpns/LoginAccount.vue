<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号">
        <el-input class="input" v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import localCache from '@/utils/localCache'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // eslint-disable-next-line no-undef
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
        }
      })
    }
    return {
      account,
      formRef,
      loginAction,
      rules
    }
  }
})
</script>

<style lang="less" scoped>
// .login-account {
//   .input {
//     height: 50px;
//     width: 100%;
//     background-color: rgba(255, 255, 255, 0.07);
//     border-radius: 3px;
//     padding: 0 10px;
//     margin-top: 8px;
//     font-size: 14px;
//     font-weight: 300;
//   }
// }
</style>
