<template>
  <TheLoader v-if="showLoading" />
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheLoader from './components/TheLoader.vue';

// local state for loader
const showLoading = ref(false);
</script>

<style>
.app-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.left {
  flex: 1;
}

.right {
  flex: 1;
}
</style>
