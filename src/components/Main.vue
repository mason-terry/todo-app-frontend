<template>
  <div>
    <div>
      <button @click="submitLogout">Log out</button>
      <button @click="goToProfile">Profile</button>
    </div>
    <h1>Todo App</h1>
    <h2>My Lists</h2>
    <div v-if="currentUserLists.length">
      <div
        v-for="list in currentUserLists"
        :key="list.id"
      >
        <a
          class="list"
          @click="openList(list.id)"
        >{{ list.name }}</a>
      </div>
      <button @click="openAddList">Add a new list</button>
    </div>
    <div v-else>
      <p>You don't have any lists right now.</p>
      <button @click="openAddList">Add a list</button>
    </div>
    <div v-if="addList">
      <input
        type="text"
        v-model="listName"
        placeholder="List Name"
      />
      <button @click="createList">Create list</button>
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
    ...mapState('users', ['userToken', 'currentUser', 'currentUserLists'])
  },
  methods: {
    ...mapActions('users', ['logout', 'updateCurrentUser', 'verifyUserToken']),
    ...mapActions('lists', ['createNewList']),
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
        owner: { name: this.currentUser.name, id: this.currentUser._id }
      }
      await this.createNewList(paylaod)
      this.addList = false
      this.listName = ''
      await this.updateCurrentUser(this.currentUser._id)
    },
    openList(id) {
      console.log('id', id)
    }
  }
}
</script>

<style scoped>
.list {
  cursor: pointer;
}
</style>
