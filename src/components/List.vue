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
      <div
        v-for="todo in listTodos"
        :key="todo._id"
      >
        <div v-if="todo.completed">
          <p class="uk-list complete">{{ todo.item }}</p>
        </div>
      </div>
      <add-button
        type="add-todo"
        openButton="Add Another Todo"
        addButton="Add Todo"
        placeHolder="Todo"
      ></add-button>
    </div>
    <div v-else>
      <p>Add some items to your list.</p>
      <add-button
        type="add-todo"
        openButton="Add A Todo"
        addButton="Add Todo"
        placeHolder="Todo"
      ></add-button>
    </div>
  </div>
</template>

<script>
import AddButton from './add-button'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'List',
  components: {
    AddButton
  },
  computed: {
    ...mapState('lists', ['currentList']),
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

.button {
  margin: 10px 0;
}

button {
  cursor: pointer;
}
</style>
