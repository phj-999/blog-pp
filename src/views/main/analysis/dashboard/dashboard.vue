<template>
  <div class="dashboard">
    <h2>dashboard</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    return {}
  }
})
</script>

<style scoped></style>
