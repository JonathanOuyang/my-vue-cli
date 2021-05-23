<template>
  <div id="app">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'hello world'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: blue;
}
</style>