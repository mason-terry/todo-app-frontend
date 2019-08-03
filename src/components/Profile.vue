<template>
  <div>
    <button @click="goToHome">Home</button>
    <h1>This is my profile</h1>
    <p>{{ currentUser.name }}</p>
    <p>{{ currentUser.email }}</p>
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
