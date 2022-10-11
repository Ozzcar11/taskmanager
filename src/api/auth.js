import { DefaultAPIInstance } from "../utils/axios"

export const AuthAPI = {
  login(body) {
    return DefaultAPIInstance.post("/login", body)
  },
  logout(body) {
   return DefaultAPIInstance.post("/logout", body)
  }
}
