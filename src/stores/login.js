import { defineStore } from "pinia"
import { AuthAPI } from "@/api/auth"

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: localStorage.getItem("token"),
      userRole: localStorage.getItem("userRole")
    }
  },
  actions: { 
    async login(body) {
      try {
         const res = await AuthAPI.login(body)
         const data = res.data
         const thisStore = useAuthStore()
         thisStore.setToken(data.token)
         thisStore.setRole(data.role)
      } catch (e) {
         throw e
      }
    },
    async logout() {
      await AuthAPI.logout(this.token)
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
    },
    setToken(token) {
      this.token = token
      localStorage.setItem("token", token)
    },
    setRole(role) {
      localStorage.setItem("userRole", ["Администратор", "Пользователь"].find((item, index) => index == role))
    }
  },
  getters: {
   getToken: (state) => state.token,
   getRole: (state) => state.userRole
  }
})
