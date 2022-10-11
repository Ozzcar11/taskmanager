<script setup>
import { ref } from "vue"
import { Search } from "@element-plus/icons-vue"
import { RouterLink } from "vue-router"

const props = defineProps({
   create: Boolean,
})

const search = ref("")

</script>

<template>
   <el-header class="header">
      <div class="header__container">
         <el-input v-model="search" class="header__search" placeholder="Поиск" :prefix-icon="Search" />
         <el-button v-if="!props.create" class="header__notification">
            <img src="../assets/icons/notification.svg" alt="" />
         </el-button>
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
      align-items: center;
      max-width: 350px;
      margin: 10px 0px 10px auto;
   }

   &__search {
      margin-right: 20px;

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