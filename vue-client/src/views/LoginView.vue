<template>
  <section>
    <LoginForm />
    <Notificaçao />
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
