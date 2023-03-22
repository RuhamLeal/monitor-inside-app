<template>
  <section id="main-login-page">
    <Notificaçao />
    <LoginForm />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginForm from '@/components/LoginForm.vue';
import Notificaçao from '@/components/Notificação.vue';

@Options({
  components: {
    LoginForm,
    Notificaçao,
  },
})
export default class LoginView extends Vue {}
</script>

<style scoped>
  body, html, div#app, section#main-login-page {
  background-color: #11181f;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
    height: 100%;
    margin: 0;
}
</style>
