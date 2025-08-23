<template>
  
  <the-loader v-if ="showLoading"></the-loader>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import TheLoader from './components/TheLoader.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
    computed: {
        ...mapState({
            showLoading: (state) => state.showLoading,
        }),
    },

    components: {
        TheLoader,
    },

}
</script>

<style>
.app-container {
  display: flex;
  justify-content: space-between; /* pushes them apart */
  align-items: center; /* vertically aligned */
  height: 100vh; /* full screen height */
  padding: 20px;
}

.left {
  flex: 1; /* takes space on left */
}

.right {
  flex: 1; /* takes space on right */
}
</style>
