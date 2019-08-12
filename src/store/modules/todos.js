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
    },
    async completeTodo({ dispatch }, payload) {
      const todoId = payload.todoId
      const listId = payload.listId
      await TodoService.completeTodo(todoId)
      dispatch('getListTodos', listId)
    },
    async deleteTodo({ dispatch }, payload) {
      const todoId = payload.todoId
      const listId = payload.listId
      await TodoService.deleteTodo(todoId)
      dispatch('getListTodos', listId)
    }
  }
}