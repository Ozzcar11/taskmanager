<script setup>
import { RouterLink } from "vue-router"

const props = defineProps({
  isCollapse: Boolean,
})
</script>

<template>
  <RouterLink to="/" class="aside__logo">
    <img src="../../assets/images/EllcoTMLogo.svg" alt="EllcoTM лого" />
    <span :class="{ item_collapsed: isCollapse }">Ellco TM</span>
  </RouterLink>
</template>

<style lang="scss">
.aside__logo {
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
</style>
