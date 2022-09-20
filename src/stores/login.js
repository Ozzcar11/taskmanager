import { defineStore } from "pinia"
import { AuthAPI } from "@/api/auth"
import { ElMessage } from "element-plus"

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token:
        localStorage.getItem("token") || "bdc405c9-c4ec-43ee-af87-f1e2dabac290",
    }
  },
  actions: {
    async login(body) {
      try {
        const res = await AuthAPI.login(body)
        const data = res.data.user_information
        const thisStore = useAuthStore()
        thisStore.setToken(data.user_token)
      } catch (e) {
        ElMessage.error(e.response.data.message)
      }
    },
    setToken(token) {
      this.token = token
      localStorage.setItem("token", token)
    },
  },
})
