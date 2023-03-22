h<template>
  <header>
    <h1>STARTI</h1>
    <h2>{{ timestamp }}</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'header-component',
  setup() {
    const store = useStore();

    return {
      timestamp: computed(() => store.getters.serverStats.timestamp),
    };
  },

});
</script>

<style scoped>
  header {
    display: flex;
    align-items: center;
    background: #233546;
    color: wheat;
    width: 100%;
    height: 10%;
  }

  header h1 {
    position: relative;
    left: 40%;
  }

  header h2 {
    position: relative;
    font-size: 18px;
    left: 80%;
  }
</style>
