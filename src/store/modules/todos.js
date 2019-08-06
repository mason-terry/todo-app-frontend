import TodoService from '../../services/todo-service'

export default {
  namespaced: true,
  state: {
    listTodos: []
  },
  getters: {},
  mutations: {
    setListTodos(state, todos) {
      state.listTodos = todos
    }
  },
  actions: {
    async addTodo({ dispatch }, payload) {
      await TodoService.addTodo(payload)
      dispatch('getListTodos', payload.listId)
    },
    async getListTodos({ commit }, id) {
      const response = await TodoService.getListTodos(id)
      const todos = response.data
      commit('setListTodos', todos)
    }
  }
}