<template>
  <main class="editor shadow">
    <div ref="editor" id="editor"></div>
    <section class="actions">
      <a-button type="primary" @click="showModal">发布</a-button>
      <a-button type="danger">清空</a-button>
    </section>
       <b-modal ref="modal"/>
  </main>
</template>

<script>
import xss from "xss";
import { onMounted,ref } from "vue";
import { uselocalStorage } from "../../use/local-storage";
import { useEditor } from "../../use/editor";
import { useInfoNotice } from "../../use/notice";
import { useDebouce } from "../../use/common.js";
import BModal from '../../blocks/modal.vue'


export default {
  components: {
   BModal
  },
  setup() {
    const editor = useEditor();
    editor.config.zIndex = 0;
    editor.config.height = 600;

    const [draft] = uselocalStorage("draft");

    onMounted(() => editor.txt.html(draft.value));

    editor.config.onchange = useDebouce((newHtml) => {
      draft.value = xss(newHtml);
      useInfoNotice({
        message: "草稿",
        description: "已缓存",
      });
    }, 3000);

       const modal = ref(null);
    const showModal = () => modal.value.setVisible(true);


    return {
    modal,  showModal
    };
  },
};
</script>

<style scoped>
.editor {
  margin: 30px 10px;
  background-color: #eceff1;
  padding: 10px;
  border-radius: 4px;
}

.actions {
  padding: 8px;
  text-align: center;
  z-index: 9999;
}

.actions > * {
  margin: 10px;
}
</style>