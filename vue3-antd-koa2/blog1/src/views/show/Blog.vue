<template>
  <main>
    <b-card-list :cardRecords="cardRecords" />
   <c-pagination :total='500'/>
  </main>
</template>

<script>

import BCardList from "../../blocks/card-list.vue";
import { blogViewConfig } from "../../view-provider/show/blog";
import CPagination from '../../components/pagination'

export default {
  components: {
    BCardList,CPagination
  },
  setup() {
    const { cardRecords } = blogViewConfig;
    
    return {
      cardRecords
    };
  },
};
</script>

<style scoped>

</style>