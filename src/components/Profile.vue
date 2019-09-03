<template>
  <div>
    <button
      uk-icon="list"
      @click="goToHome"
    ></button>
    <h1>{{ currentUser.name }}'s Profile</h1>
    <p><strong>Name:</strong> {{ currentUser.name }}</p>
    <p><strong>Email:</strong> {{ currentUser.email }}</p>
    <p><strong>Username:</strong> {{ currentUser.username }}</p>
    <!-- Edit Profile/Username/Email/Password/Name -->
    <!-- Add and display a profile image -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  async mounted() {},
  computed: {
    ...mapState('users', ['currentUser'])
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
