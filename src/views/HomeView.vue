<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"
import TheHeader from "@/components/TheHeader.vue"

const isCollapse = ref(false)
</script>

<template>
  <el-container style="height: 100vh">
    <el-aside
      class="aside"
      :class="{ aside__collapsed: isCollapse }"
      width="260px"
    >
      <RouterLink to="/" class="aside__logo">
        <img src="../assets/images/EllcoTMLogo.svg" alt="EllcoTM лого" />
        <span :class="{ item_collapsed: isCollapse }">Ellco TM</span>
      </RouterLink>
      <el-menu
        default-active="2"
        :collapse="isCollapse"
        class="aside__menu menu"
      >
        <el-menu-item class="menu__item">
          <img class="menu__icon" src="../assets/icons/table.svg" alt="" />
          <span :class="{ item_collapsed: isCollapse }">Таблица</span>
        </el-menu-item>
      </el-menu>
      <el-button class="aside__collapse-btn" @click="isCollapse = !isCollapse">
        <img src="../assets/icons/arrow.svg" alt="" />
      </el-button>
      <div class="aside__footer">
        <span>Test</span>
        <el-button class="aside__exit" @click="logout">
          <img src="../assets/icons/exit.svg" alt="" />
        </el-button>
      </div>
    </el-aside>
    <el-container>
      <TheHeader />
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss">
body {
  background-color: $Shark;
}

.aside {
  position: relative;
  background-color: $Tuna;
  overflow: visible;
  transition: 0.3s var(--el-transition-function-ease-in-out-bezier);
  &__menu:not(.el-menu--collapse) {
    width: 230px;
  }
  .el-menu--collapse {
    width: 80px;
  }
  &__collapsed {
    width: 80px;
    .aside__collapse-btn span {
      transform: translate(2px) rotate(180deg);
    }
  }
  &__logo {
    color: #fff;
    width: 160px;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    text-decoration: none;
    img {
      padding-left: 20px;
      background-color: $Tuna;
      z-index: 2;
    }
    span {
      font-size: 20px;
      font-weight: 700;
      margin-left: 10px;
      transition: all 0.3s var(--el-transition-function-ease-in-out-bezier);
    }
  }
  &__collapse-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    width: 40px;
    height: 40px;
    border: 5px solid $Shark;
    border-radius: 50%;
    background-color: $Picton;
  }

  &__footer {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
  }

  &__exit {
    padding: 18px 8px;
    background-color: $Abbey;
    border: none;
    margin-left: 20px;
  }
}

.menu {
  margin-top: 100px;
  background-color: inherit;
  border: none;
  &__item {
    font-size: 16px;
    font-weight: 500;
    background-color: $Picton;
    border-radius: 0px 32px 32px 0px;
    span {
      transition: all 0.3s var(--el-transition-function-ease-in-out-bezier);
    }
    &.is-active {
      color: inherit;
    }
  }
  &__icon {
    padding: 0px 20px 0px 0px;
    background-color: inherit;
    z-index: 2;
  }
}

.item_collapsed {
  transform: translate(-100%);
  opacity: 0;
}
</style>
