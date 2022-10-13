import { defineStore } from "pinia"

export const useNotificationStore = defineStore("notification", {
  state: () => {
    return {
      notificationStatus: true,
      wsData: {},
      filterStatus: 0
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
   }
  },
  getters: {
   getNotificationStatus : (state) => state.notificationStatus,
   getWsData: (state) => state.wsData,
   getFilterStatus: (state) => state.filterStatus
  }
})
