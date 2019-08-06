<template>
  <div>
    <div>
      <button @click="submitLogout">Log out</button>
      <button @click="goToProfile">Profile</button>
    </div>
    <h1>My Lists</h1>
    <div v-if="ownersLists.length">
      <div
        v-for="list in ownersLists"
        :key="list.id"
      >
        <a
          class="list"
          @click="openList(list._id)"
        >
          <p>{{ list.name }}</p>
        </a>
      </div>
      <button
        v-if="!addList"
        @click="openAddList"
      >Add a new list</button>
    </div>
    <div v-else>
      <p>You have not added any lists.</p>
      <button
        v-if="!addList"
        @click="openAddList"
      >Add a list</button>
    </div>
    <div v-if="addList">
      <input
        type="text"
        v-model="listName"
        placeholder="List Name"
      />
      <button @click="createList">Create list</button>
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
    ...mapState('lists', ['ownersLists', 'sharedLists'])
  },
  methods: {
    ...mapActions('users', ['logout', 'updateCurrentUser', 'verifyUserToken']),
    ...mapActions('lists', ['createNewList', 'getList']),
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
      await this.updateCurrentUser(this.currentUser._id)
    },
    async openList(id) {
      await this.getList(id)
      await this.getListTodos(id)
      this.$router.push('/list')
    }
  }
}
</script>

<style scoped>
.list {
  cursor: pointer;
}
</style>
