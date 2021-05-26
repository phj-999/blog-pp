<template>
  <main>
    <b-card-list :cardRecords="cardRecords" />
    <a-pagination
      class="pagination"
      :total="pagination.total"
      v-model:pageSize="pagination.pageSize"
      v-model:current="pagination.current"
      simple
      @change="onCurrentPageNumChange"
    />
  </main>
</template>

<script>
import { reactive, watchEffect } from "vue";
import BCardList from "../../blocks/card-list.vue";
import { blogViewConfig } from "../../view-provider/show/blog";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    BCardList,
  },
  setup() {
    const { cardRecords } = blogViewConfig;
    const pagination = reactive({
      total: 500,
      pageSize: 5,
      current: 1,
    });

    const router = useRouter();
    const route = useRoute();
    watchEffect(() => {  //在浏览器导航栏更改页数  分页部分页码跟着改变
      const { pageNum } = route.params;
      pagination.current = pageNum;
        //滚动效果平滑滚动上去
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    });
    const onCurrentPageNumChange = (currentPageNum) => {
      console.log(currentPageNum);
      router.push({   //改变页数  浏览器处网页地址页数跟随改变
        params: {
          pageNum: currentPageNum,
        },
      });

      //滚动效果平滑滚动上去
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    };

    return {
      cardRecords,
      pagination,
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