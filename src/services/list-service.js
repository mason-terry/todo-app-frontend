import { Api } from './api-service'

export default {
  getLists(id) {
    return Api.get(`/users/${id}/lists`)
  },
  getList(id) {
    return Api.get(`/lists/${id}`)
  },
  addList(payload) {
    return Api.post('/lists', payload)
  }
}
