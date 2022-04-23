<template>
  <div class="login-panel">
    <h1 class="title">管理系统</h1>
    <el-tabs class="tabs" type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" class="login-account" />
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <!-- 按钮 -->
    <el-button class="button">Custom</el-button>
    <div class="account-control">
      <el-checkbox class="left">记住密码</el-checkbox>
      <el-link class="right" type="primary">忘记密码</el-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'

export default defineComponent({
  components: { LoginAccount },
  setup() {
    const currentTab = ref('account')
    const isKeepPassword = ref(true)
    // eslint-disable-next-line no-undef
    const accountRef = ref()
    //const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    return {
      currentTab,
      isKeepPassword,
      accountRef
      //phoneRef
    }
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  h1 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }
  .tabs {
    background-color: rgba(255, 255, 255, 0.13);
  }
  .button {
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .account-control {
    margin-top: 30px;
    display: flex;
    .right {
      margin-left: 25px;
    }
    .left,
    .right {
      background: red;
      width: 150px;
      border-radius: 3px;
      padding: 5px 10px 10px 5px;
      background-color: rgba(255, 255, 255, 0.27);
      color: #150f03;
      text-align: center;
      @media (prefers-color-scheme: dark) {
        & {
          color: #eaf0fb;
        }

        body {
          background: #000;
        }
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.47);
      }
    }
  }
}
.login-panel * {
  font-family: 'Poppins', sans-serif;
  color: #000000;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

@media (prefers-color-scheme: dark) {
  .login-panel * {
    color: #ffffff;
  }
}
</style>
