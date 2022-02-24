<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <search-form v-bind="modalConfig" v-model="formData">
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirmClick">
              确 定
            </el-button>
          </span>
        </template>
      </search-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import SearchForm from '@/base-ui/form/src/SearchForm.vue'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: { SearchForm },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    return {
      dialogVisible
    }
  }
})
</script>

<style lang="less" scoped></style>
