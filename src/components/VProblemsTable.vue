<script setup>
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import { formatDate, formatResolvedDate } from '@/utils/formatDate'
import { getStringStatus, getStringStatusRU } from '@/utils/getStringStatus'
import { fileNameHandler } from '@/utils/fileNameURl'
import BaseCopyButton from "./Base/BaseCopyButton.vue"

const props = defineProps({
   tableHeadline: Array,
   tableData: Array,
})
function getBitrixHref(item) {
   if (!item[0]) return 'https://bitrix24.ellcom.ru/company/personal/user/0/tasks/task/edit/0/'
   return `https://bitrix24.ellcom.ru/company/personal/user/45354/tasks/task/view/${item[0]}/`
}

const userRole = localStorage.getItem('userRole')
</script>

<template>
   <el-table class="main-table" :data="props.tableData" empty-text="No such information"
      style="width: 100%; height: 100%;" table-layout="auto" v-el-table-infinite-scroll="() => $emit('lazyLoad')">
      <el-table-column prop="host" label="Хост">
         <template #default="scope">
            <span class="main-table__text">{{ scope.row.host }}</span>
            <BaseCopyButton name="copy" :copy="scope.row.host" />
         </template>
      </el-table-column>
      <el-table-column prop="host_name" label="Имя хоста">
         <template #default="scope">
            <span class="main-table__text">{{ scope.row.hostname }}</span>
            <div class="main-table__btn-container">
               <BaseCopyButton name="copy" :copy="scope.row.hostname" />
               <BaseCopyButton name="browse" :link="scope.row.hostname" />
            </div>
         </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус">
         <template #default="scope">
            <div class="main-table__btn-container">
               <img :src="fileNameHandler(getStringStatus(scope.row.status))" />
               <span class="main-table__status" :class="getStringStatus(scope.row.status)">
                  {{ getStringStatusRU(scope.row.status) }}
               </span>
            </div>
         </template>
      </el-table-column>
      <el-table-column prop="resolvedDate" label="Продолжительность">
         <template #default="scope">
            {{ formatResolvedDate(scope.row.createDate, scope.row.resolvedDate) }}
         </template>
      </el-table-column>
      <el-table-column prop="createDate" label="Дата">
         <template #default="scope">
            {{ formatDate(scope.row.createDate) }}
         </template>
      </el-table-column>
      <el-table-column width="100px">
         <template #default="scope">
            <el-tooltip v-if="scope.row.bitrixId?.[1]" class="box-item" effect="dark" content="Top Left prompts info"
               placement="bottom" trigger="click">
               <template #content>
                  <a v-for="(item, index) in scope.row.bitrixId" :key="index" class="tool-tip__id"
                     :href="`https://bitrix24.ellcom.ru/company/personal/user/45354/tasks/task/view/${item}/`"
                     target="_blank">
                     {{ item }}
                  </a>
               </template>
               <el-button class="main-table__bitrix-btn">
                  <img src="../assets/icons/share.svg" />
               </el-button>
            </el-tooltip>
            <a v-else class="el-button main-table__bitrix-btn" :href="getBitrixHref(scope.row.bitrixId)"
               target="_blank">
               <img src="../assets/icons/share.svg" />
            </a>
         </template>
      </el-table-column>
      <el-table-column v-if="userRole === 'Администратор'" width="100px">
         <template #default="scope">
            <el-button type="primary" size="default" class="no-button" @click="$emit('deleteProblem', scope.row.id)">
               <el-icon style="width: 16px; height: 16px">
                  <DeleteFilled style="width: 16px; height: 16px" />
               </el-icon>
            </el-button>
         </template>
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
      background-color: $CodGray !important;
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
      font-weight: 700;
      white-space: pre-wrap;

      &.error {
         color: rgb(226, 85, 85);
      }

      &.warning {
         color: rgb(223, 193, 26);
      }

      &.success {
         color: rgb(64, 206, 64);
      }
   }

   &__btn-container {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
   }

   &__bitrix-btn {
      background-color: transparent;
      border: none;
   }
}

.tool-tip__id {
   color: #fff;
   display: block;
   text-decoration: none;

   &+& {
      margin-top: 5px;
   }
}

.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
   background-color: $Shark !important;
}

.no-button {
   border: none;
   background-color: transparent;

   &:active,
   &:focus {
      background-color: inherit;
   }

   &:hover {
      background-color: #fff;

      i {
         color: rgb(226, 85, 85);
      }
   }
}
</style>

