import { Api } from './api-service'

export default {
  getListTodos(id) {
    return Api.get(`/lists/${id}/todos`)
  },
  addTodo(payload) {
    return Api.post('/todos', payload)
  },
  completeTodo(id) {
    return Api.put(`/todos/${id}/complete`)
  },
  deleteTodo(id) {
    return Api.put(`/todos/${id}/delete`)
  }
}
