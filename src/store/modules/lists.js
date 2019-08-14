import ListService from '../../services/list-service'

export default {
  namespaced: true,
  state: {
    currentList: undefined,
    ownersLists: [],
    sharedLists: []
  },
  getters: {},
  mutations: {
    setCurrentList(state, list) {
      state.currentList = list
    },
    setUserLists(state, lists) {
      state.ownersLists = lists.ownersLists
      state.sharedLists = lists.sharedLists
    }
  },
  actions: {
    async createNewList({ commit, dispatch }, payload) {
      const response = await ListService.addList(payload)
      const newList = response.data.newList
      dispatch('todos/getListTodos', newList._id, { root: true })
      commit('setCurrentList', newList)
    },
    async getList({ commit }, id) {
      const response = await ListService.getList(id)
      const list = response.data
      commit('setCurrentList', list)
    },
    async getUserLists({ commit }, id) {
      const response = await ListService.getLists(id)
      const listData = response.data
      commit('setUserLists', listData)
    }
  }
}
