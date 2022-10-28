<script setup>
import { ref, watch } from 'vue'
import { Search } from "@element-plus/icons-vue"
import { RouterLink } from "vue-router"
import { useNotificationStore } from '@/stores/notification'
import getBoolean from '@/utils/getBooleanFromSting'

const emit = defineEmits()

const props = defineProps({
   create: Boolean,
})

const notificationStore = useNotificationStore()

const notification = ref(getBoolean(localStorage.getItem('notificationStatus')) ?? true)
function notificationHandler() {
   notification.value = !notification.value
   localStorage.setItem('notificationStatus', notification.value)
}

watch(notification, (val) => {
   notificationStore.setNotificationStatus(val)
})

const search = ref('')

watch(search, (val) => {
   notification.value = val === ''
})
</script>

<template>
   <el-header class="header">
      <div class="header__container">
         <template v-if="!props.create">
            <el-input v-model="search" @input="emit('searchProblems', search)" class="header__search"
               placeholder="Поиск" :prefix-icon="Search" />
            <el-button class="header__notification" @click="notificationHandler">
               <el-icon size="20px">
                  <Bell v-if="notification" />
                  <MuteNotification v-else />
               </el-icon>
            </el-button>
         </template>
         <RouterLink class="header__create" v-else to="/create-user">
            <el-button>
               <el-icon style="margin-right: 5px
               ;">
                  <Plus />
               </el-icon>Создать
            </el-button>
         </RouterLink>
      </div>
   </el-header>
</template>

<style lang="scss">
.header {
   height: auto;

   &__container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 10px 0px 10px auto;
   }

   &__search {
      width: 290px;
      margin-right: 20px;

      input {
         color: #fff;
      }

      &::placeholder {
         color: $CodGray;
      }

      .el-input__wrapper {
         padding: 3px 11px;
         background-color: $CodGray;
         border-radius: 6px;
         border: 1px solid $MidGray;
         box-shadow: none;

         &:hover {
            box-shadow: inset 0px 0px 0px 1px $GraySuit;
         }

         &.is-focus {
            box-shadow: inset 0px 0px 0px 1px $Dodger;
         }
      }
   }

   &__notification {
      padding: 2px 10px;
      background-color: $Shark;
      border: none;
      box-sizing: content-box;

      span {
         pointer-events: none;
      }
   }

   &__create {
      border-radius: 6px;
      text-decoration: none !important;

      button {
         color: #fff;
         font-weight: 500;
         background-color: $Denim;
         border: none;
      }
   }
}
</style>