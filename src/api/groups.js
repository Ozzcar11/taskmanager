import { DefaultAPIInstance } from "../utils/axios"

export const GroupAPI = {
  allGroups() {
    return DefaultAPIInstance.post("/host-groups/show")
  },
  add(body) {
    return DefaultAPIInstance.post("/host-groups/add", body)
  },
  delete(body) {
    return DefaultAPIInstance.post("/host-groups/delete", body)
  },
}