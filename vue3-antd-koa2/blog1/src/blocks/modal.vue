<template>
  <a-modal
    v-model:visible="visible"
    title="文章发布设置"
    @ok="submit(formState)"
  >
    <a-form layout="vertical" :model="formState">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="标题">
          <template #prefix> <EditOutlined /> </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.synopsis" placeholder="简介">
          <template #prefix> <ContainerOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        类型:
        <a-radio-group v-model:value="formState.type">
          <a-radio value="blog"> 日志 </a-radio>
          <a-radio value="book"> 读书 </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Modal, Radio } from "ant-design-vue";
import { EditOutlined, ContainerOutlined } from "@ant-design/icons-vue";
import { useState } from "../use/hooks";
import { reactive, toRaw } from "vue";
import {useSuccessNotice} from '../use/notice'

export default {
   components:{
    AModal: Modal,
    EditOutlined,
    ContainerOutlined,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
   },
 
   setup() {
      const [visible, setVisible] = useState(false);



    const formState = reactive({
      title: "",
      synopsis: "",
      type: "blog",
    });

const submit = (record) => {
      console.log(toRaw(record));
      useSuccessNotice({
        message: "发布成功",
      });
      setVisible(false);
    };


    return {
  visible,
     setVisible,
      formState,
      submit,
}

   },








};
</script>

<style>
</style>