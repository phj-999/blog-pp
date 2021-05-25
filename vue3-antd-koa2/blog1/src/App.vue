<template>
  <b-header :config="appViewConfig" />
  <router-view />
</template>

<script>
import BHeader from "./blocks/header.vue";
import { appViewConfig } from "../src/view-provider/app.js";

export default {
  components: {
    BHeader,
  },
  setup() {
    return {
      appViewConfig,
    };
  },
};
</script>

<style>
@import url("./style.css");
</style>
