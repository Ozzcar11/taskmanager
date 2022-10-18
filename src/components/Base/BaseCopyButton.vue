<script setup>
import { ElMessage } from "element-plus"
import { RequestAPI } from "../../api/request"
import { fileNameHandler } from '../../utils/fileNameURl'

const props = defineProps({
   name: String,
   copy: String,
   link: String,
})

const successMessage = (text) => {
   ElMessage({
      message: text,
      type: "success",
      duration: 1000
   })
}

async function handleClick(text) {
   if (props.copy) {
      navigator.clipboard.writeText(text)
      successMessage("Текст скопирован")
   } else {
      const res = await RequestAPI.showMap(
         JSON.stringify({
            okato: props.link,
         })
      )
      const data = res.data
      console.log(data);
      window.open(
         `https://glaber.ellco.ru/zabbix.php?action=map.view&sysmapid=${data.sysmapId}&search_selementid=${data.selementId}`,
         "_blank"
      )
   }
}
</script>

<template>
   <el-button class="copy-btn" type="primary" size="small" @click="handleClick(copy)">
      <img :src="fileNameHandler(props.name)" />
   </el-button>
</template>

<style lang="scss">
.copy-btn {
   padding: 5px;
   background-color: $CodGray;
   border: none;
   border-radius: 6px;
}
</style>
