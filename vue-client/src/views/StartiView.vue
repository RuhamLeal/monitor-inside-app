<template>
  <div id="starti-main">
    <Sidebar />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from '@/components/Sidebar.vue';

@Options({
  components: {
    Sidebar,
  },
})
export default class LoginView extends Vue {}
</script>

<style >
  #starti-main {
    display: flex;
  }

  body, html, div#app, div#starti-main {
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
