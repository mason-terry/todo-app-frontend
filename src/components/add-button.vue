<template>
  <div>
    <button @click="openInputHandler">Open Input</button>
    <input
      v-if="openInput"
      type="text"
    >
    <button
      v-if="openInput"
      @click="sumitHandler"
    >Add Item</button>
  </div>
</template>

<script>
export default {
  name: 'add-button',
  props: ['type'],
  data: () => ({
    openInput: false
  }),
  methods: {
    openInputHandler() {
      this.openInput = true
    },
    submitHandler() {
      this.openInput = false
    }
  }
}
</script>

<style scoped lang="css">
</style>