import { defineStore } from "pinia"

export const useFiltersStore = defineStore("filters", {
  state: () => {
    return {
      filters: {}
    }
  },
  actions: {
   setFilter(data) {
      this.filters = data
   }
  },
  getters: {
   getFilters : (state) => state.filters,
  }
})
