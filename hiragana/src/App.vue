<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #efefef
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: column
  height: 100vh
  max-width: 100vw


body
  overflow: hidden
  margin: 0
</style>
