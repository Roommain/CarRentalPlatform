<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  lang="less">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.app {
    width: 100%;
    height: 100%;
    min-width: 1200px;
}
</style>
