import UserService from '../../services/user-service'

export default {
  namespaced: true,
  state: {
    userToken: undefined,
    currentUser: {},
    currentUserLists: [],
    loginMessage: ''
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
      const user = response.data.user
      dispatch('updateCurrentUser', user._id)
    },
    async updateCurrentUser({ commit }, id) {
      const response = await UserService.getUser(id)
      const user = response.data
      commit('setCurrentUser', user)
      commit('setCurrentUserLists', user.lists)
    }
  }
}
