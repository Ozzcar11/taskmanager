<script setup>
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import { getStringRole } from "@/utils/getStringRole";

const props = defineProps({
   tableHeadline: Array,
   tableData: Array,
})
</script>

<template>
   <el-table class="main-table" :data="props.tableData" empty-text="No such information"
      style="width: 100%; height: 100%;" table-layout="auto" v-el-table-infinite-scroll="() => $emit('lazyLoad')">
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="middleName" label="Middlename" />
      <el-table-column prop="role" label="Role">
         <template #default="scope">
            {{ getStringRole(scope.row.role) }}
         </template>
      </el-table-column>
      <el-table-column>
         <template #default="scope">
            <el-button class="table__user-btn" type="primary" size="default" @click="$emit('editUser', scope.row.id)">
               <el-icon>
                  <Edit />
               </el-icon>
            </el-button>
         </template>
      </el-table-column>
   </el-table>
</template>

<style lang="scss">
.main-table {
   .table__user-btn {
      padding: 10px;
      background-color: $Denim;
      border: none;
      border-radius: 6px;
   }

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
   background-color: $Shark !important;
}
</style>
