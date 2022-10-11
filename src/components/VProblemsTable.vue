<script setup>
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import { formatDate, formatResolvedDate } from '@/utils/formatDate'
// import { soketInstance } from "@/utils/soketio.js"
import BaseCopyButton from "./Base/BaseCopyButton.vue"



const props = defineProps({
   tableHeadline: Array,
   tableData: Array,
})

// soketInstance.on("connection", (data) => {
//   console.log(data)
// })

function getStringStatus(status) {
   return ["error", "warning", "success"].find((item, index) => ++index == status)
}
</script>

<template>
   <el-table class="main-table" :data="props.tableData" style="width: 100%; height: 100%;" table-layout="auto"
      v-el-table-infinite-scroll="() => $emit('lazyLoad')">
      <el-table-column prop="host" label="Host">
         <template #default="scope">
            <span class="main-table__text">{{ scope.row.host }}</span>
            <BaseCopyButton name="copy" :copy="scope.row.host" />
         </template>
      </el-table-column>
      <el-table-column prop="host_name" label="Hostname">
         <template #default="scope">
            <span class="main-table__text">{{ scope.row.hostname }}</span>
            <div class="main-table__btn-container">
               <BaseCopyButton name="copy" :copy="scope.row.hostname" />
               <BaseCopyButton name="browse" :link="scope.row.hostname" />
            </div>
         </template>
      </el-table-column>
      <el-table-column prop="status" label="Status">
         <template #default="scope">
            <div class="main-table__btn-container">
               <img :src="`/src/assets/icons/${getStringStatus(scope.row.status)}.svg`" />
               <span class="main-table__status">
                  {{ getStringStatus(scope.row.status) }}
               </span>
            </div>
         </template>
      </el-table-column>
      <el-table-column prop="resolvedDate" label="Age">
         <template #default="scope">
            {{ formatResolvedDate(scope.row.resolvedDate) }}
         </template>
      </el-table-column>
      <el-table-column prop="createDate" label="Date">
         <template #default="scope">
            {{ formatDate(scope.row.createDate) }}
         </template>
      </el-table-column>
      <el-table-column width="100px">
         <a href="https://bitrix24.ellcom.ru/company/personal/user/0/tasks/task/edit/0/">
            <img src="/src/assets/icons/share.svg" />
         </a>
      </el-table-column>
   </el-table>
</template>

<style lang="scss">
.main-table {

   .el-table__row {
      background-color: $Shark;
   }

   thead .el-table__cell {
      color: $Picton;
      font-weight: 700;
      background-color: $CodGray;
   }

   .el-table__cell {
      color: #fff;
      border-bottom: 1px solid $Tuna !important;

      &:first-child {
         padding-left: 15px;
      }
   }

   th,
   &__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   .cell {
      display: flex;
      justify-content: space-between;
   }

   &__status {
      margin-left: 10px;
      text-transform: capitalize;
      font-weight: 700;
   }

   &__btn-container {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
   }
}


.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
   background-color: $Shark;
}
</style>
