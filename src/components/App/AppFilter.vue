<script setup>
import { ref, onMounted } from "vue"
import { RequestAPI } from "../../api/request"

const emit = defineEmits()

const allProblems = ref({})

async function getProblems() {
   const res = await RequestAPI.countProblems()
   allProblems.value = res.data
}

function emitStatusAndRefreshTable(status) {
   emit("update:modelValue", status)
}

onMounted(() => {
   getProblems()
})
</script>

<template>
   <div class="filter">
      <el-button @click="emitStatusAndRefreshTable(0)">
         <img src="/src/assets/icons/allcount.svg" />
         <span style="margin-left: 10px">{{ allProblems.total }}</span>
      </el-button>
      <el-button @click="emitStatusAndRefreshTable(3)">
         <img src="/src/assets/icons/success.svg" />
         <span style="margin-left: 10px">{{ allProblems.success }}</span>
      </el-button>
      <el-button @click="emitStatusAndRefreshTable(2)">
         <img src="/src/assets/icons/warning.svg" />
         <span style="margin-left: 10px">{{ allProblems.warning }}</span>
      </el-button>
      <el-button @click="emitStatusAndRefreshTable(1)">
         <img src="/src/assets/icons/error.svg" />
         <span style="margin-left: 10px">{{ allProblems.error }}</span>
      </el-button>
   </div>
</template>

<style lang="scss">
.filter {
   button {
      color: #fff;
      padding: 10px;
      background-color: $Abbey;
      border: none;
   }
}
</style>
