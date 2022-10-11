<script setup>
import { ref } from "vue"
import { RequestAPI } from "@/api/request"
import { UserAPI } from "@/api/user"


import TheHeader from "@/components/TheHeader.vue"
import VUsersTable from "@/components/VUsersTable.vue";

const tableHeadline = ['Ник', "Имя", "Отчество", "Роль"]

let tableData = ref([])

async function requestUsers() {
   const res = await RequestAPI.users()
   tableData.value = res.data
}

const dialogVisible = ref(false)

const transferValue = ref([])
const transferData = ref([])

const currentUserId = ref(null)

async function editUser(userId) {
   const res = await UserAPI.groups(JSON.stringify({ userId }))
   const data = res.data
   currentUserId.value = userId
   transferData.value = data.exclusiveInformation ?? []
   if (data.inclusiveInformation) {
      transferData.value.push(...data.inclusiveInformation)
      for (let item of data.inclusiveInformation) transferValue.value.push(item.key)
   }

   dialogVisible.value = true
}

const editUserGroups = (value, direct, items) => {
   console.log(direct);
   switch (direct) {
      case 'right':
         for (let id of items)
            UserAPI.addGroup(JSON.stringify({
               userId: currentUserId.value,
               hostGroupId: id
            }))
         break
      case 'left':
         for (let id of items)
            UserAPI.deleteGroup(JSON.stringify({
               userId: currentUserId.value,
               hostGroupId: id
            }))
         break
   }
}

requestUsers()
</script>

<template>
   <el-container>
      <TheHeader create />
      <el-main style="padding: 0">
         <VUsersTable :tableHeadline="tableHeadline" :tableData="tableData" @editUser="editUser" />
      </el-main>
      <el-footer class="users-table">
      </el-footer>
   </el-container>
   <el-dialog class="user-transfer" v-model="dialogVisible" title="Редактирование групп" width="32%">
      <el-transfer v-model="transferValue" :data="transferData" :titles="['Неактивные','Активные']"
         @change="editUserGroups" />
   </el-dialog>
</template>

<style lang="scss">
.users-table {
   height: 0;
}

.el-main {
   .el-table__inner-wrapper::before {
      width: 0;
      height: 0;
   }

   .el-scrollbar {
      background-color: $Shark;
   }
}

.user-transfer {
   &.el-dialog {
      background-color: $Shark;
   }

   .el-dialog__title {
      font-size: 18px;
      font-weight: 700;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: $Picton;
   }

   .el-transfer {
      margin-top: 20px;

      &-panel {
         background-color: $CodGray;

         &__header {
            background-color: $Abbey;
            border: none;
         }

         &__body {
            border: none;
         }

      }
   }

   .el-checkbox__label {
      color: #fff !important;
   }
}
</style>
