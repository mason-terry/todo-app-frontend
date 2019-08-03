<template>
  <div>
    <h2>My List</h2>
    <p>{{ currentList }}</p>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'

export default {
  name: 'List',
  data: () => ({
    currentList: 'Hello'
  }),
  computed: {
    // ...mapState('lists', ['currentList'])
  },
  methods: {
    // ...mapActions('lists')
  }
}
</script>
