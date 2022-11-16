import { DefaultAPIInstance } from '../utils/axios'

export const RequestAPI = {
  showMap(body) {
    return DefaultAPIInstance.post('/show-map', body)
  },
  countProblems() {
    return DefaultAPIInstance.post('/problems/show-counts')
  },
  scrollProblems(body) {
    return DefaultAPIInstance.post('/problems/scrolling', body)
  },
  users(body) {
    return DefaultAPIInstance.post('/users/show', body)
  },
  search(body) {
    return DefaultAPIInstance.post('/problems/search', body)
  },
  deleteProblem(body) {
   return DefaultAPIInstance.post('/problems/delete', body)
  }
}
