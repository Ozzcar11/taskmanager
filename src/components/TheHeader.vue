<script setup>
import { ref } from "vue"
import { Search } from "@element-plus/icons-vue"

const search = ref("")
</script>

<template>
  <el-header class="header">
    <div class="header__container">
      <el-input
        v-model="search"
        class="header__search"
        placeholder="Поиск"
        :prefix-icon="Search"
      />
      <el-button class="header__notification">
        <img src="../assets/icons/notification.svg" alt="" />
      </el-button>
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
    background-color: $Shark;
    border: none;
  }
}
</style>
