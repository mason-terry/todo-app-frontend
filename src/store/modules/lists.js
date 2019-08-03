import ListService from '../../services/list-service'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createNewList({ commit }, payload) {
      await ListService.addList(payload)
    }
  }
}
