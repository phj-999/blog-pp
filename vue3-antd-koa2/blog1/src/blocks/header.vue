<template>
  <a-page-header class="b-header" :isScroll="isScroll">
    <!-- title -->
    <template #title>
      <!-- avator -->
      <a-avatar
        :src="avatar.src"
        :shape="avatar.shape || 'square'"
        :size="avatar.size || 'large'"
      >
      </a-avatar>
    </template>
    <!-- tags -->
    <template #tags>
      <a-tag v-for="tag of tags" :key="tag.text" :color="tag.color">
        {{ tag.text }}
      </a-tag>
    </template>
    <!-- buttons-right -->
    <template #extra>
      <a-button
        v-for="item of menu"
        @click="item.handle"
        :key="item.text"
        :type="item.type"
      >
        {{ item.text }}
      </a-button>
    </template>
  </a-page-header>
</template>

<script>
import { PageHeader } from "ant-design-vue";
import { useWindowScrollStatus } from "../use/scroll.js";

export default {
  components: {
    APageHeader: PageHeader,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { avatar = {}, tags = [], menu = {} } = props.config || {};
    const isScroll = useWindowScrollStatus();

    return {
      avatar,
      tags,
      menu,
      isScroll,
    };
  },
};
</script>

<style scoped>
.b-header {
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 10px;
  transition: all 0.3s ease-in-out;
}

.b-header:hover,
.b-header[isScroll="true"] {
  transition: all 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
}
</style>