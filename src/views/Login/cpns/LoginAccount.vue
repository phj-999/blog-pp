<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号">
        <el-input class="input" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    return {
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
