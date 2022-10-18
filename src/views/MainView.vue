<script setup>
import { ref } from "vue"
import { RouterView } from "vue-router"

import AppLogo from "@/components/App/AppLogo.vue"
import AppAsideMenu from "@/components/App/AppAsideMenu.vue"
import AppAsideFooter from "@/components/App/AppAsideFooter.vue"

const isCollapse = ref(false)
</script>

<template>
   <el-container style="height: 100vh">
      <el-aside class="aside" :class="{ aside__collapsed: isCollapse }" width="260px">
         <AppLogo :isCollapse="isCollapse" />
         <AppAsideMenu :isCollapse="isCollapse" />
         <AppAsideFooter :isCollapse="isCollapse" />
         <el-button class="aside__collapse-btn aside__button" @click="isCollapse = !isCollapse">
            <img src="../assets/icons/arrow.svg" alt="" />
         </el-button>
      </el-aside>
      <RouterView />
   </el-container>
</template>

<style lang="scss">
body {
   background-color: $Shark;
}

.aside {
   position: relative;
   background-color: $Tuna;
   overflow: visible !important;
   transition: 0.3s var(--el-transition-function-ease-in-out-bezier);

   &__collapsed {
      width: 80px !important;

      .aside__collapse-btn span {
         transform: translate(2px) rotate(180deg);
      }
   }

   &__collapse-btn.aside__button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 40px;
      height: 40px;
      border: 5px solid $Shark;
      border-radius: 50%;
      background-color: $Picton;
      z-index: 20;
   }
}

.item_collapsed {
   transform: translate(-100%);
   opacity: 0;
}
</style>