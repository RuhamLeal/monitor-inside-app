<template>
  <header>
    <h1>Monitoring Inside</h1>
    <h2>Olá, {{ username }}</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'header-component',
  setup() {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user).username;
    }

    return {
      username: user || '',
    };
  },

});
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
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
    margin-right: 2%;
  }
</style>
