import { Api } from './api-service'

export default {
  getListTodos(id) {
    return Api.get(`/lists/${id}/todos`)
  },
  addTodo(payload) {
    return Api.post('/todos', payload)
  }
}
