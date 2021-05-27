<template>
<main class="article shadow">
  <a-table 
  :columns="columns" 
  :data-source="data" 
:pagination="pagination"
  @change='handleChange'>
    <template #type="{ text }">
        <a-tag :color='useColor(text)'>{{text}}</a-tag>
    
    </template>
    <template #edit>
      <a-button class="mx-1" type='danger'>删除</a-button>
      <a-button class="mx-1" type='primary'>更新</a-button>
      <a-button class="mx-1">查看</a-button>
    </template>
  </a-table>
</main>
</template>
<script>
import { Table } from "ant-design-vue";
import { articleViewConfig } from "../../view-provider/manage/article";
import {useColorMap} from '../../use/color'
import {useRouterParamChange} from '../../use/router.js'
import {useLinkdRouteParam} from '../../use/route.js'

export default {
  components: {
    [Table.name]: Table,
  },
  setup() {
    const { columns, data, pagination } = articleViewConfig;
    const colorMap = new Map([
        ['blog','#009688'],
        ['book','#2196F3']
    ])

    const useColor = useColorMap(colorMap)
    pagination.current = useLinkdRouteParam("pageNum");
    const pageNumParamChange = useRouterParamChange ("pageNum")
    const handleChange = ({current}) => pageNumParamChange (current)

    return {
      data,
      columns,
      useColor,
      pagination,
      handleChange
    };
  },
};
</script>

<style scoped>
.article{
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid #cfd8dc;
}
</style>