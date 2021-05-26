<template>
 <main class="notfound">
      <a-empty description='无此页面'></a-empty>
 </main>
</template>

<script>
import {Empty} from 'ant-design-vue'

export default {
components:{
    AEmpty:Empty
}
}
</script>

<style scoped>
.notfound{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>