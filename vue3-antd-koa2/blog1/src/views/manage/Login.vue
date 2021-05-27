<template>
<main class="login">
    <a-form
    class="login-form shadow"
    layout="vertical"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        block
        type="primary"
        html-type="submit"
        :disabled="disabled"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</main>
</template>
<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, computed } from 'vue';
export default defineComponent({
  setup() {
    const formState = reactive({
      user: '',
      password: '',
    });

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

const disabled = computed(()=>{
  return formState.user === '' || formState.password === ''
})

    return {
      formState,
      handleFinish,
      handleFinishFailed,
      disabled
    };
  },

  components: {
    UserOutlined,
    LockOutlined,
  },
  
});
</script>

<style scoped>
.login {
padding: 50px;
display: flex;
justify-content: center;
align-items: center;
}
.login-form {
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #CFD8DC;
}
</style>