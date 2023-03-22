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
        <h1 v-show="err">{{ errMsg }}</h1>
      </section>
      <div class="fields">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { LOGIN } from '@/store/actions-types';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificaçao';
import loginValidation from '@/services/validations/loginValidation';

export default defineComponent({
  name: 'login-form',
  setup() {
    const router = useRouter();
    const store = useStore();

    const { notificar } = useNotificador();

    const inputEmail = ref('');
    const inputPassword = ref('');

    const inputErr = ref({
      err: false,
      msg: '',
    });

    const login = async () => {
      const loginFields = { email: inputEmail.value, password: inputPassword.value };

      const { err } = loginValidation(loginFields);

      if (err) {
        inputErr.value.msg = err;
        inputErr.value.err = true;
        return null;
      }

      const res = await store.dispatch(
        LOGIN,
        loginFields,
      );

      if (res.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao logar', res.message);
      }

      const userStorage = {
        username: res.username,
        admin: res.admin,
      };

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(userStorage));

      return router.push('/starti/dashboard');
    };

    return {
      inputEmail,
      inputPassword,
      login,
      notificar,
      err: computed(() => inputErr.value.err),
      errMsg: computed(() => inputErr.value.msg),
    };
  },
});
</script>
