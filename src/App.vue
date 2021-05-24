<template>
  <div id="app">
    <h1>{{env.TITLE}}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      env: process.env
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: blue;
  transform: translateX(10px);
}
</style>