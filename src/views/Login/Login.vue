<template>
  <div class="login">
    <Particles id="tsparticles" class="login__particles" :options="particles" />
    <login-panel />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { particles } from './config/particles-config'
import LoginPanel from './cpns/LoginPanel.vue'

export default defineComponent({
  components: { LoginPanel },
  setup() {
    return {
      particles
    }
  }
})
</script>

<style lang="less" scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
