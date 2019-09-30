<template>
  <div>
    <div>
      <button
        class="uk-margin-small-right"
        uk-icon="user"
        @click="goToProfile"
      ></button>
      <button
        uk-icon="sign-out"
        @click="submitLogout"
      ></button>
    </div>
    <h1>My Lists</h1>
    <div v-if="ownersLists.length">
      <div
        v-for="list in ownersLists"
        :key="list.id"
      >
        <p class="uk-list">
          <span
            class="list"
            @click="openList(list._id)"
          >{{ list.name }}</span>&nbsp;
          <button
            class="uk-margin-small-right"
            uk-icon="trash"
            @click="deleteUserList(list._id)"
          ></button>
        </p>
      </div>
      <button
        class="uk-button uk-button-default uk-button-small"
        v-if="!addList"
        @click="openAddList"
      >Add a new list</button>
    </div>
    <div v-else>
      <p>You have not added any lists.</p>
      <button
        class="uk-button uk-button-default uk-button-small"
        v-if="!addList"
        @click="openAddList"
      >Add a list</button>
    </div>
    <div v-if="addList">
      <input
        class="uk-input uk-form-width-medium"
        type="text"
        v-model="listName"
        placeholder="List Name"
        autofocus
      />
      <button
        class="uk-button uk-button-default uk-button-small"
        @click="createList"
      >Create list</button>
    </div>
    <h2 v-if="sharedLists.length">Shared Lists</h2>
    <div v-if="sharedLists.length">
      <div
        v-for="list in sharedLists"
        :key="list.id"
      >
        <a
          class="list"
          @click="openList(list._id)"
        >{{ list.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Main',
  data: () => ({
    addList: false,
    listName: ''
  }),
  async mounted() {
    await this.init()
  },
  computed: {
    ...mapState('users', ['userToken', 'currentUser']),
    ...mapState('lists', ['ownersLists', 'sharedLists', 'currentList'])
  },
  methods: {
    ...mapActions('users', ['logout', 'updateCurrentUser', 'verifyUserToken']),
    ...mapActions('lists', ['createNewList', 'getList', 'deleteList']),
    ...mapActions('todos', ['getListTodos']),
    async init() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$route.push('/login')
      } else {
        await this.verifyUserToken(token)
      }
    },
    submitLogout() {
      this.logout()
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    goToProfile() {
      this.$router.push('/profile')
    },
    openAddList() {
      this.addList = true
    },
    async createList() {
      const paylaod = {
        name: this.listName,
        ownerId: this.currentUser._id
      }
      await this.createNewList(paylaod)
      this.addList = false
      this.listName = ''
      this.$router.push('/list')
    },
    async openList(id) {
      await this.getList(id)
      await this.getListTodos(id)
      this.$router.push('/list')
    },
    async deleteUserList(id) {
      const payload = { userId: this.currentUser._id, listId: id }
      await this.deleteList(payload)
    }
  }
}
</script>

<style scoped>
.list {
  cursor: pointer;
}
</style>
