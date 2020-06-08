import UserService from '../../services/user-service'

export default {
  namespaced: true,
  state: {
    userToken: undefined,
    currentUser: {},
    currentUserLists: [],
    loginMessage: '',
    allUsers: []
  },
  getters: {},
  mutations: {
    setCurrentUserToken(state, token) {
      state.userToken = token
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    setCurrentUserLists(state, lists) {
      state.currentUserLists = lists
    },
    setLoginMessage(state, message) {
      state.loginMessage = message
    },
    setAllUsers(state, list) {
      state.allUsers = list
    }
  },
  actions: {
    async login({ commit }, payload) {
      const response = await UserService.userLogin(payload)
      const token = response.data.token
      if (token) {
        const user = response.data.user
        commit('setCurrentUserToken', token)
        commit('setCurrentUser', user)
        commit('setCurrentUserLists', user)
      } else {
        const message = response.data.message
        commit('setLoginMessage', message)
      }
    },
    logout({ commit }) {
      commit('setCurrentUserToken', undefined)
      commit('setCurrentUser', {})
    },
    async verifyUserToken({ dispatch }, token) {
      const response = await UserService.verifyToken(token)
      const userId = response.data.user_id
      dispatch('updateCurrentUser', userId)
    },
    async updateCurrentUser({ commit, dispatch }, id) {
      const response = await UserService.getUser(id)
      const user = response.data
      commit('setCurrentUser', user)
      dispatch('lists/getUserLists', id, { root: true })
    },
    async addUser({ commit }, payload) {
      const response = await UserService.addUser(payload)
      const { newUser, token } = response.data
      commit('setCurrentUserToken', token)
      commit('setCurrentUser', newUser)
    },
    async getUsers({ commit }) {
      const response = await UserService.getUsers()
      commit('setAllUsers', response.data)
    }
  }
}
