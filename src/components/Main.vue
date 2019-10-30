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
      <add-button
        type="add-list"
        openButton="Add A List"
        addButton="Create List"
        placeHolder="List Name"
      ></add-button>
    </div>
    <div v-else>
      <p>You have not added any lists.</p>
      <add-button
        type="add-list"
        openButton="Add A New List"
        addButton="Create List"
        placeHolder="List Name"
      ></add-button>
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
import AddButton from './add-button'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Main',
  components: {
    AddButton
  },
  async mounted() {
    await this.init()
  },
  computed: {
    ...mapState('users', ['userToken', 'currentUser']),
    ...mapState('lists', ['ownersLists', 'sharedLists'])
  },
  methods: {
    ...mapActions('users', ['logout', 'updateCurrentUser', 'verifyUserToken']),
    ...mapActions('lists', ['getList', 'deleteList']),
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
