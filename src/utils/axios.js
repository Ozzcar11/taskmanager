import axios from "axios"
import { useAuthStore } from "../stores/login"
import { AuthAPI } from "@/api/auth"
const loginConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
}

export const DefaultAPIInstance = axios.create(loginConfig)

DefaultAPIInstance.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore()
    config.headers["authorization"] = authStore.token
    return config
  },
  (error) => Promise.reject(error)
)

DefaultAPIInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.code === 401 && !originalRequest._retry) {
      const res = await AuthAPI.refreshToken()
      originalRequest._retry = true
      store.commit("refreshToken", res.data.access)
      return axios(originalRequest)
    }
    return Promise.reject(error)
  }
)
