<script setup lang="ts">
const buildTime = __BUILD_TIME__
</script>

<template>
  <main>
    <h1 text-xl>
      Release Notes
    </h1>
    <br>
    <ul text-left>
      <li>08/01/2023 - Added release notes</li>
      <li>05/01/2023 - Basic scaffold app with release notes and test form</li>
    </ul>
  </main>
  <br>
  <footer>
    <div id="build_time">
      Last build time: {{ buildTime }}
    </div>
  </footer>
</template>

<style scoped>

</style>
