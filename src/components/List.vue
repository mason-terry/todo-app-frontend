<template>
  <div v-if="currentList">
    <button
      uk-icon="list"
      @click="goToHome"
    ></button>
    <h1>{{ currentList.name }}</h1>
    <div v-if="listTodos.length">
      <div
        v-for="todo in listTodos"
        :key="todo._id"
      >
        <div v-if="todo.completed">
          <p class="uk-list complete">{{ todo.item }}</p>
        </div>
        <div v-if="!todo.completed">
          <p class="uk-list">{{ todo.item }}
            <button
              class="uk-margin-small-right"
              uk-icon="check"
              @click="completeItem(todo._id)"
            ></button>
            <button
              class="uk-margin-small-right"
              uk-icon="trash"
              @click="deleteItem(todo._id)"
            ></button>
          </p>
        </div>
      </div>
      <button
        class="uk-button uk-button-default uk-button-small"
        v-if="!openInput"
        @click="openTodoInput"
      >Add Another Item</button>
    </div>
    <div v-else>
      <p>Add some items to your list.</p>
      <button
        class="uk-button uk-button-default uk-button-small"
        v-if="!openInput"
        @click="openTodoInput"
      >Add An Item</button>
    </div>
    <div v-if="openInput">
      <input
        class="uk-input uk-form-width-medium"
        type="text"
        v-model="todo"
        placeholder="Item"
      >
      <button
        class="uk-button uk-button-default uk-button-small"
        @click="createTodo"
      >Add Item</button>
    </div>
    <div>
      <button
        class="uk-button uk-button-default uk-button-small"
        @click="shareList"
      >Share List</button>
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
  created() {
    this.init()
  },
  methods: {
    ...mapActions('todos', ['addTodo', 'completeTodo', 'deleteTodo']),
    init() {
      if (!this.currentList) {
        this.goToHome()
      }
    },
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
    },
    async completeItem(todoId) {
      const listId = this.currentList._id
      const payload = { todoId, listId }
      await this.completeTodo(payload)
    },
    async deleteItem(todoId) {
      const listId = this.currentList._id
      const payload = { todoId, listId }
      await this.deleteTodo(payload)
    },
    async shareList() {
      alert('sharing list')
    }
  }
}
</script>

<style scoped>
.complete {
  text-decoration: line-through;
}

button {
  cursor: pointer;
}
</style>
