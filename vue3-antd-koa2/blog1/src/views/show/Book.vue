<template>
  <main>
    <b-card-list :cardRecords="cardRecords" />
   <c-pagination :total='500'/>
  </main>
</template>

<script>

import BCardList from "../../blocks/card-list.vue";
import { bookViewConfig } from "../../view-provider/show/book.js";
import CPagination from '../../components/pagination'

export default {
  components: {
    BCardList,CPagination
  },
  setup() {
    const { cardRecords } = bookViewConfig;
    
    return {
      cardRecords
    };
  },
};
</script>

<style scoped>

</style>