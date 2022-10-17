<script setup>
import { ref, watch } from "vue"

import TheHeader from "@/components/TheHeader.vue"
import VProblemsTable from "@/components/VProblemsTable.vue"
import AppFilter from "@/components/App/AppFilter.vue"
import { RequestAPI } from "@/api/request"
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const tableHeadline = ["Host", "Hostname", "Problem", "Status", "Age", "Date"]

const requestDate = ref({
   createDate: 0,
   limit: 30,
   status: 0,
   problemId: 0
})

const filterStatus = ref(0)

let tableData = ref([])
let countAll = ref(1)

async function requestProblems() {
   const res = await RequestAPI.scrollProblems(
      JSON.stringify(requestDate.value)
   )
   const data = res.data
   if (data.counts === null) return
   const lastEl = data.problemsInformation.at(-1)
   countAll.value = data.counts
   tableData.value.push(...data.problemsInformation)
   requestDate.value.createDate = lastEl?.createDate
   requestDate.value.problemId = lastEl?.id
}

watch(() => notificationStore.getWsData, (value) => {
   console.log(value);
   switch (value.socketType) {
      case 1:
         tableData.value = []
         requestProblems()
         break
      case 2:
         tableData.value = tableData.value.filter(item => item.id !== value.id)
         tableData.value.unshift(value)
         break
      case 3:
         tableData.value = tableData.value.filter(item => item.id !== value.id)
         break
   }
}, { deep: true })

watch(filterStatus, value => {
   if (value === requestDate.value.status) return
   tableData.value = []
   countAll.value = 1
   requestDate.value = {
      createDate: 0,
      limit: 30,
      status: filterStatus.value,
      problemId: 0
   }
   requestProblems()
})

async function searchProblems(search) {
   if (search === '') {
      tableData.value = []
      requestDate.value = {
         createDate: 0,
         limit: 30,
         status: filterStatus.value,
         problemId: 0
      }
      requestProblems()
      return
   }
   const res = await RequestAPI.search(JSON.stringify({
      status: requestDate.value.status,
      search
   }))
   tableData.value = [...res.data.problemsInformation]
}
</script>

<template>
   <el-container>
      <TheHeader @searchProblems="searchProblems" />
      <el-main style="padding: 0">
         <VProblemsTable :tableHeadline="tableHeadline" :tableData="tableData" @lazyLoad="requestProblems" />
      </el-main>
      <el-footer class="table-footer">
         <AppFilter v-model="filterStatus" />
      </el-footer>
   </el-container>
</template>

<style lang="scss">
.el-main {
   .el-table__inner-wrapper::before {
      width: 0;
      height: 0;
   }

   .el-scrollbar {
      background-color: $Shark;
   }
}

.table-footer {
   display: flex;
   align-items: center;
   background-color: $CodGray;

}
</style>
