<template>
  <div id="starti-container">
    <Notificacao />
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
import Notificacao from '@/components/Notificação.vue';

@Options({
  components: {
    Sidebar,
    Header,
    Notificacao,
  },
})
export default class LoginView extends Vue {}
</script>

<style>
  #starti-container {
    display: flex;
  }

  #starti-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #starti-routes {
    height: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgb(233, 233, 233);
  }

  div#starti-container {
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
