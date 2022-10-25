import { defineStore } from 'pinia'
import { AuthAPI } from '@/api/auth'
import { getStringRole } from '@/utils/getStringRole'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: localStorage.getItem('token'),
      userRole: localStorage.getItem('userRole')
    }
  },
  actions: {
    async login(body) {
      try {
        const res = await AuthAPI.login(body)
        const data = res.data
        this.setToken(data.token)
        this.setRole(data.role)
      } catch (e) {
        throw e
      }
    },
    async logout() {
      await AuthAPI.logout(this.token)
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setRole(role) {
      const stringRole = getStringRole(role)
      this.userRole = stringRole
      localStorage.setItem('userRole', stringRole)
    }
  },
  getters: {
    getToken: (state) => state.token,
    getRole: (state) => state.userRole
  }
})
