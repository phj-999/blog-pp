<template>
  <main class="show">
    <b-view-header :config="showIndexViewConfig">
      <template #footer>
        <u-button-group />
      </template>
    </b-view-header>
<!-- 给标签下内容添加切换时候的渐变效果 -->
    <router-view v-slot='{ Component }'>
      <transition name='fade' mode= 'out-in'>
        <component :is="Component"/>
      </transition>
    </router-view>

  </main>
</template>

<script>
import BViewHeader from "../../blocks/view-header";
import { showIndexViewConfig } from "../../view-provider/show/index";
import { useButtonGroup } from "../../use/button-group.jsx";

export default {
  components: {
    BViewHeader,
    UButtonGroup: useButtonGroup(showIndexViewConfig.buttonGroup),
  },
  setup() {
    return {
      showIndexViewConfig,
    };
  },
};
</script>

<style scoped>
.show {
  width: 50vw;
  margin: 50px auto;
  padding: 50px 0;
}
</style>