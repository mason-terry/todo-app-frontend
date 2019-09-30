<template>
  <div>
    <h1>New User</h1>
    <input
      class="uk-input uk-form-width-medium"
      type="text"
      placeholder="Name"
      v-model="name"
    />
    <br />
    <input
      class="uk-input uk-form-width-medium uk-margin-top"
      type="email"
      placeholder="Email"
      v-model="email"
    />
    <br />
    <input
      class="uk-input uk-form-width-medium uk-margin-top"
      type="text"
      placeholder="Username"
      v-model="username"
    />
    <br />
    <input
      class="uk-input uk-form-width-medium uk-margin-top"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <br />
    <button
      class="uk-button uk-button-primary uk-button-small uk-margin-top"
      @click="addNewUser"
    >Create</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NewUser',
  data: () => ({
    username: '',
    name: '',
    email: '',
    password: '',
    message: ''
  }),
  computed: {
    ...mapState('users', ['userToken'])
  },
  methods: {
    ...mapActions('users', ['addUser']),
    inputCheck() {
      if (this.username && this.name && this.email && this.password) {
        return true
      } else {
        return false
      }
    },
    async addNewUser() {
      const payload = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      }
      if (this.inputCheck()) {
        await this.addUser(payload)
        localStorage.setItem('token', this.userToken)
        this.$router.push('/')
      } else {
        alert('Please fill out all forms.')
      }
    }
  }
}
</script>

<style>
</style>