<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/login';
import { useRoute } from 'vue-router';

const props = defineProps({
   isCollapse: Boolean,
})

const route = useRoute()
const authStore = useAuthStore()

// const menuItems = [
//    {
//       id: '1',
//       name: 'Таблица',
//       icon: 'Grid',
//       route: '/',
//       enableFor: ["Администратор", "Пользователь"]
//    },
//    {
//       id: '2',
//       name: 'Пользователи',
//       icon: 'UserFilled',
//       route: '/users',
//       enableFor: ["Администратор"]
//    },
//    {
//       id: '3',
//       name: 'Группы',
//       icon: 'Operation',
//       route: '/groups',
//       enableFor: ["Администратор"]
//    },
// ]

// const available = computed(() => {
//    const userRole = authStore.getRole
//    const filteredMenuItems = menuItems.filter(filterItem => filterItem.enableFor.find(item => item == userRole))
//    return filteredMenuItems
// })

let userRole = computed(() => authStore.getRole) 

const available = ref([
   {
      id: '1',
      name: 'Таблица',
      icon: 'Grid',
      route: '/',
      enableFor: ["Администратор", "Пользователь"]
   },
   {
      id: '2',
      name: 'Пользователи',
      icon: 'UserFilled',
      route: '/users',
      enableFor: ["Администратор"]
   },
   {
      id: '3',
      name: 'Группы',
      icon: 'Operation',
      route: '/groups',
      enableFor: ["Администратор"]
   },
])

watch(userRole, () => {
   available.value = available.value.filter(filterItem => filterItem.enableFor.find(item => item == userRole.value))
})
</script>

<template>
   <el-menu :default-active="route.path" :collapse="isCollapse" class="aside__menu menu" :router="true">
      <el-menu-item v-for="item in available" :key="item.id" class="menu__item" :index="item.route" :route="item.route">
         <el-icon>
            <component :is='item.icon' />
         </el-icon>
         <span>{{ item.name }}</span>
      </el-menu-item>
   </el-menu>
</template>

<style lang="scss">
.menu {
   margin-top: 100px;
   background-color: inherit;
   border: none;

   &:not(.el-menu--collapse) {
      width: 230px;
   }

   &__item {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      border-radius: 0px 32px 32px 0px;

      &.is-active {
         color: inherit;
         background-color: $Picton;
      }

      &+& {
         margin-top: 10px;
      }

      &:hover {
         color: $Tuna;
      }

      img {
         margin-right: 20px;
      }
   }

   &__icon {
      margin: 0px 20px 0px 0px;
      z-index: 2;
   }
}

.el-menu--collapse {
   width: 80px;
}
</style>
