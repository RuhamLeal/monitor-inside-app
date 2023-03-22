<template>
  <div id="starti-container">
    <Sidebar />
    <main id="starti-main">
      <Header />
      <router-view id="starti-routes"/>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';

@Options({
  components: {
    Sidebar,
    Header,
  },
})
export default class LoginView extends Vue {}
</script>

<style >
  #starti-container {
    display: flex;
  }

  #starti-main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #starti-routes {
    height: 100%;
    background-color: rgb(233, 233, 233);
  }

  body, html, div#app, div#starti-container {
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
