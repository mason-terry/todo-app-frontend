<template>
  <div>
    <button
      v-if="!openInput"
      class="uk-button uk-button-default uk-button-small"
      @click="openInputHandler"
    >{{ openButton }}</button>
    <input
      v-if="openInput"
      class="uk-input uk-form-width-medium"
      type="text"
      v-model="input"
      :placeholder="placeHolder"
    >
    <button
      v-if="openInput"
      class="uk-button uk-button-default uk-button-small"
      @click="submitHandler"
    >{{ addButton }}</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'add-button',
  props: ['type', 'openButton', 'addButton', 'placeHolder'],
  data: () => ({
    openInput: false,
    input: ''
  }),
  computed: {
    ...mapState('users', ['currentUser']),
    ...mapState('lists', ['currentList'])
  },
  methods: {
    ...mapActions('lists', ['createNewList']),
    ...mapActions('todos', ['addTodo']),
    openInputHandler() {
      this.openInput = true
    },
    async submitHandler() {
      if (this.type === 'add-list') {
        const payload = { name: this.input, ownerId: this.currentUser._id }
        await this.createNewList(payload)
        this.$router.push('/list')
      }
      if (this.type === 'add-todo') {
        const payload = {
          item: this.input,
          listId: this.currentList._id,
          userId: this.currentUser._id
        }
        await this.addTodo(payload)
      }
      this.openInput = false
      this.input = ''
    }
  }
}
</script>

<style scoped lang="css">
</style>