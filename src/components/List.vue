<template>
  <div>
    <button @click="goToHome">Home</button>
    <h1>{{ currentList.name }}</h1>
    <div v-if="listTodos.length">
      <div
        v-for="todo in listTodos"
        :key="todo._id"
      >
        <p>{{ todo.item }}</p>
      </div>
      <button
        v-if="!openInput"
        @click="openTodoInput"
      >Add Another Todo</button>
    </div>
    <div v-else>
      <p>You don't have any todo's yet</p>
      <button
        v-if="!openInput"
        @click="openTodoInput"
      >Add A Todo</button>
    </div>
    <div v-if="openInput">
      <input
        type="text"
        v-model="todo"
        placeholder="Todo"
      >
      <button @click="createTodo">Add Todo</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'List',
  data: () => ({
    openInput: false,
    todo: ''
  }),
  computed: {
    ...mapState('lists', ['currentList']),
    ...mapState('users', ['currentUser']),
    ...mapState('todos', ['listTodos'])
  },
  methods: {
    ...mapActions('todos', ['addTodo']),
    goToHome() {
      this.$router.push('/')
    },
    openTodoInput() {
      this.openInput = true
    },
    async createTodo() {
      const payload = {
        item: this.todo,
        listId: this.currentList._id,
        userId: this.currentUser._id
      }
      await this.addTodo(payload)
      this.todo = ''
      this.openInput = false
    }
  }
}
</script>
