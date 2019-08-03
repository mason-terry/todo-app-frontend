import { Api } from './api-service'

export default {
  getLists() {
    return Api.get('/lists')
  },
  getUsersLists(id) {
    return Api.get(`/lists/${id}`)
  },
  addList(payload) {
    return Api.post('/lists', payload)
  }
}
