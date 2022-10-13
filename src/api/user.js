import { DefaultAPIInstance } from "../utils/axios"

export const UserAPI = {
   profile() {
      return DefaultAPIInstance.post("/show-profile")
   },
   groups(body) {
      return DefaultAPIInstance.post("/show-user-host-groups", body)
   },
   add(body) {
      return DefaultAPIInstance.post("/users/add", body)
   },
   delete(body) {
      return DefaultAPIInstance.post("/users/delete", body)
   },
   addGroup(body) {
      return DefaultAPIInstance.post("/add-user-host-group", body)
   },
   deleteGroup(body) {
      return DefaultAPIInstance.post("/delete-user-host-group", body)
   }
}