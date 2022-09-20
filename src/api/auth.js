import { DefaultAPIInstance } from "../utils/axios"

export const AuthAPI = {
  login(body) {
    return DefaultAPIInstance.post("/user_login", body)
  },
}
