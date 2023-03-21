<template>
  <main>
    <form @submit.prevent="login">
      <section class="fields">
        <label for="login-input-email" class="label">
          Usuario
          <input
            type="text"
            class="login-input"
            v-model="inputEmail"
            id="login-input-email"
          />
        </label>
        <label for="login-input-password" class="label">
          Senha
          <input
            type="password"
            class="login-input"
            v-model="inputPassword"
            id="login-input-password"
          />
        </label>
      </section>
      <div class="fields">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { LOGIN } from '@/store/actions-types';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificaçao';

export default defineComponent({
  name: 'login-form',
  setup() {
    const router = useRouter();
    const store = useStore();

    const { notificar } = useNotificador();

    const inputEmail = ref('');
    const inputPassword = ref('');

    const login = async () => {
      const res = await store.dispatch(
        LOGIN,
        { email: inputEmail.value, password: inputPassword.value },
      );

      if (res.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao logar', res.message);
      }

      localStorage.setItem('token', res.token);

      return router.push('/');
    };

    return {
      inputEmail,
      inputPassword,
      login,
      notificar,
    };
  },
});
</script>
