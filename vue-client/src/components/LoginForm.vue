<template>
  <main>
    <form @submit.prevent="login">
      <div class="fields">
        <img id="logo-image-sidebar" alt="logo" src="../assets/logo.png">
      </div>
      <div class="fields">
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
        <span id="span-message" v-show="err">{{ errMsg }}</span>
      </div>
      <div class="fields">
        <button class="button" type="submit">Login</button>
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

      if (res?.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao logar', res.message);
      }

      const userStorage = {
        username: res.username,
        admin: res.admin,
      };

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(userStorage));

      return router.push('/inside/dashboard');
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

<style scoped>
#span-message {
  margin-top: 15px;
  color: #ca4b4b;
}

#logo-image-sidebar {
  margin: 0 auto;
  max-width: 7vw;
}

main {
 align-items: center;
 display: flex;
 justify-content: center;
 margin: 0 auto;

 width: 75%;
 min-height: 90vh;
}

form {
 border-radius: 1%;
 margin: 0;
 width: 30vw;
 height: 50vh;
 background: #33404e;
 display: flex;
 align-content: center;
 align-items: center;
 justify-content: space-around;
 flex-direction: column;
}

.fields {
  width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}

.label {
  gap: 5px;
  width: 60%;
 align-items: left;
 color: #ffffff;
 display: flex;
 flex-direction: column;
 font-weight: 300;
 justify-content: center;
 padding-top: 1em;
}

.login-input {
 border: 1px solid transparent;
 border-radius: 8px;
 height: 3vh;
}

.button {
 width: 60%;
 font-size: 20px;
 height: 35px;
 background-color: #55915b;
 color: #dfe9e0;
 border: 1px solid transparent;
 border-radius: 30px;
}
</style>
