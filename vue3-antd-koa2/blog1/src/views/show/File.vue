<template>
  <main>
    <a-card title="归档时间">
      <a-timeline>
        <a-timeline-item
          v-for="record of cardRecords"
          :key="record.id"
          :color="useRandomColor()">
      
            {{ record.time }}--<a-button @click="record.handle">
              {{record.content}}
            </a-button>
          
          </a-timeline-item>
      </a-timeline>
    </a-card>
  </main>
</template>

<script>
import { fileViewConfig } from "../../view-provider/show/file.js";
import { useRandomColor } from '../../use/color'
export default {
   setup() {
     const {cardRecords} = fileViewConfig
     
     return {
       cardRecords,
       useRandomColor
     }
   }
     
};
</script>

<style>
</style>