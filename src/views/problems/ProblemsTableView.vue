<script setup>
import { ref, onMounted, watch } from "vue"

import TheHeader from "@/components/TheHeader.vue"
import VProblemsTable from "@/components/VProblemsTable.vue"
import AppFilter from "@/components/App/AppFilter.vue"
import { RequestAPI } from "@/api/request"

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
   if (countAll.value === null) return
   const res = await RequestAPI.scrollProblems(
      JSON.stringify(requestDate.value)
   )
   const data = res.data
   countAll.value = data.counts
   tableData.value.push(...data.problemsInformation)
   requestDate.value.createDate = data.problemsInformation.at(-1)?.createDate
   requestDate.value.problemId = data.problemsInformation.at(-1)?.id
}

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
</script>

<template>
   <el-container>
      <TheHeader />
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
