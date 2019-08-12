<template>
  <div>
    <h1>Login</h1>
    <input
      class="uk-input uk-form-width-medium"
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
      @click="submitLogin"
    >Login</button>
    <button class="uk-button uk-button-default uk-button-small uk-margin-top uk-margin-left">New User</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    message: ''
  }),
  computed: {
    ...mapState('users', ['userToken', 'loginMessage'])
  },
  async mounted() {},
  methods: {
    ...mapActions('users', ['login']),
    async submitLogin() {
      const payload = { username: this.username, password: this.password }
      await this.login(payload)
      if (this.userToken) {
        localStorage.setItem('token', this.userToken)
        this.resetLoginFields()
        this.$router.push('/')
      } else {
        this.message = this.loginMessage
        this.resetLoginFields()
      }
    },
    resetLoginFields() {
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
</style>
