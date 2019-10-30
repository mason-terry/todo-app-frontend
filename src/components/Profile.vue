<template>
  <div>
    <button
      uk-icon="list"
      @click="goToHome"
    ></button>
    <div v-if="editProfile">
      <h1>Edit Profile</h1>
      <div>
        <label for="name">Name</label>
      </div>
      <div>
        <input
          type="text"
          name="name"
          v-model="currentUser.name"
          class="uk-input uk-form-width-medium"
        >
      </div>
      <div>
        <label for="name">Email</label>
      </div>
      <div>
        <input
          type="text"
          name="email"
          v-model="currentUser.email"
          class="uk-input uk-form-width-medium"
        >
      </div>
      <div>
        <label for="name">Username</label>
      </div>
      <div>
        <input
          type="text"
          name="username"
          v-model="currentUser.username"
          class="uk-input uk-form-width-medium"
        >
      </div>
      <div>
        <label for="name">Password</label>
      </div>
      <div>
        <input
          type="text"
          name="password"
          v-model="newPassword"
          class="uk-input uk-form-width-medium"
        >
      </div>
      <button
        class="uk-button uk-button-default uk-button-small"
        @click="closeEditer"
      >Save Profile</button>
    </div>
    <div v-else>
      <h1>{{ currentUser.name }}'s Profile</h1>
      <p><strong>Name:</strong> {{ currentUser.name }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <p><strong>Username:</strong> {{ currentUser.username }}</p>
      <button
        class="uk-button uk-button-default uk-button-small"
        @click="openEditer"
      >Edit Profile</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data: () => ({
    editProfile: false,
    newPassword: ''
  }),
  computed: {
    ...mapState('users', ['currentUser'])
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    openEditer() {
      this.editProfile = true
    },
    closeEditer() {
      this.editProfile = false
    }
  }
}
</script>

<style scoped lang="css">
input {
  margin: 10px 0;
}
</style>
