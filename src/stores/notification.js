import { defineStore } from 'pinia'
import getBoolean from '@/utils/getBooleanFromSting'

export const useNotificationStore = defineStore('notification', {
  state: () => {
    return {
      notificationStatus:
        getBoolean(localStorage.getItem('notificationStatus')) ?? true,
      wsData: {},
      filterStatus: 0,
      searchStatus: false
    }
  },
  actions: {
    setNotificationStatus(bool) {
      this.notificationStatus = bool
    },
    setWsData(data) {
      this.wsData = data
    },
    setFilterStatus(data) {
      this.filterStatus = data
    },
    setSearchStatus(data) {
      this.searchStatus = data
    }
  },
  getters: {
    getNotificationStatus: (state) => state.notificationStatus,
    getWsData: (state) => state.wsData,
    getFilterStatus: (state) => state.filterStatus,
    getSearchStatus: (state) => state.searchStatus
  }
})
