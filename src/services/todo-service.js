import { Api } from './api-service'

export default {
  getTodos(token) {
    return Api.get('/todos', { headers: { token } })
  }
}
