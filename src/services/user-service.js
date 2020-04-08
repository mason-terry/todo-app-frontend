import { Api } from './api-service'

export default {
  getUsers() {
    return Api.get('/users/')
  },
  verifyToken(token) {
    return Api.get('/users/verify', { headers: { token } })
  },
  getUser(userId) {
    return Api.get(`/users/${userId}`)
  },
  userLogin(payload) {
    return Api.post('/users/login', payload)
  },
  addUser(payload) {
    return Api.post('/users', payload)
  }
}
