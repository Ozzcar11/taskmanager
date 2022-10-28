<script setup>
import { onMounted, computed } from "vue"
import { RequestAPI } from "../../api/request"
import { useNotificationStore } from '@/stores/notification'
import { useFiltersStore } from '@/stores/statusFilter'

const notificationStore = useNotificationStore()
const filterStore = useFiltersStore()

const emit = defineEmits()

let allProblems = computed(() => {
   return filterStore.getFilters
})

async function getProblems() {
   const res = await RequestAPI.countProblems()
   filterStore.setFilter(res.data.counts)
}

function emitStatusAndRefreshTable(status) {
   emit("update:modelValue", status)
   notificationStore.setFilterStatus(status)
}

onMounted(() => {
   getProblems()
})
</script>

<template>
   <div class="filter">
      <el-button @click="emitStatusAndRefreshTable(0)">
         <img src="@/assets/icons/allcount.svg" />
         <span style="margin-left: 10px">{{ allProblems.total }}</span>
      </el-button>
      <el-button @click="emitStatusAndRefreshTable(3)">
         <img src="@/assets/icons/success.svg" />
         <span style="margin-left: 10px">{{ allProblems.success }}</span>
      </el-button>
      <el-button @click="emitStatusAndRefreshTable(2)">
         <img src="@/assets/icons/warning.svg" />
         <span style="margin-left: 10px">{{ allProblems.warning }}</span>
      </el-button>
      <el-button @click="emitStatusAndRefreshTable(1)">
         <img src="@/assets/icons/error.svg" />
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
