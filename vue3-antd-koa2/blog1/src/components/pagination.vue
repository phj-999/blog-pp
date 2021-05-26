<template>
  <a-pagination
    class="pagination"
    :total="total"
    :defaultPageSize="defaultPageSize"
    v-model:current="current"
    simple
    hideOnSinglePage
    @change="onCurrentPageNumChange"
  />
</template>

<script>

import {  watchEffect } from "vue";
import { useRouterParamChange } from "../use/router";
import { usewindowScrollTo } from "../use/scroll";
import {useLinkdRouteParam} from '../use/route'

export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    defaultPageSize: {
      type: Number,
      default: 5,
    },
    hasScroll: {
      type: Boolean,
      default: true,
    },
  },

  setup(props,{emit}) {
    //    const pagination = reactive({
    //   total: 500,
    //   pageSize: 5,
    //   current: 1,
    // });
    const current = useLinkdRouteParam('pageNum')

 
    watchEffect(() => {

      //滚动效果平滑滚动上去
      if (props.hasScroll) {
        usewindowScrollTo({ top: 0 });
      }
      emit('change',current.value)
    });

    const pageNumParamChange = useRouterParamChange("pageNum");
    const onCurrentPageNumChange = (pageNum) => pageNumParamChange(pageNum);

    return {
      current,
      onCurrentPageNumChange,
    };
  },
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
</style>