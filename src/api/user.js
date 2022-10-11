import { DefaultAPIInstance } from "../utils/axios"

export const UserAPI = {
   groups(body) {
      return DefaultAPIInstance.post("/show-user-host-groups", body)
   },
   add(body) {
      return DefaultAPIInstance.post("/users/add", body)
   },
   addGroup(body) {
      return DefaultAPIInstance.post("/add-user-host-group", body)
   },
   deleteGroup(body) {
      return DefaultAPIInstance.post("/delete-user-host-group", body)
   }
}