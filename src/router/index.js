import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from '../stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/MainView.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/problems/ProblemsTableView.vue"),
        },
        {
          path: "users",
          name: "users",
          component: () => import("@/views/users/UsersTableView.vue"),
        },
        {
          path: "create-user",
          name: "create",
          component: () => import("@/views/users/CreateUserView.vue"),
        },
        {
          path: "groups",
          name: "groups",
          component: () => import("@/views/groups/GroupsView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!useAuthStore().getToken && to.path !== '/login')
    next('/login')
  else {
    next()
  }
})

export default router
