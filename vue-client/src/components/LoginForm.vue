<template>
  <main>
    <div id="login-container">
      <img id="login-image" alt="login-image" src="../assets/login-image.png" />
      <form @submit.prevent="login">
        <div class="fields">
          <img id="logo-image-sidebar" alt="logo" src="../assets/Monitoring_Inside-LOGO.png">
        </div>
        <div class="fields">
          <label for="login-input-email" class="label">
            Email:
            <input
              type="text"
              class="login-input"
              v-model="inputEmail"
              id="login-input-email"
              placeholder=" Insira seu email..."
            />
          </label>
          <label for="login-input-password" class="label">
            Senha
            <input
              type="password"
              class="login-input"
              v-model="inputPassword"
              id="login-input-password"
              placeholder=" Insira sua senha..."
            />
          </label>
          <span id="span-message" v-show="err">{{ errMsg }}</span>
        </div>
        <div class="fields">
          <button class="button" type="submit">Login</button>
        </div>
      </form>
    </div>
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

#login-image {
  width: 35vw;
}

#login-container {
  border-radius: 20px;
  display: flex;
  width: 60vw;
  height: 55vh;
  background: #33404e;
}

#logo-image-sidebar {
  margin: 0 auto;
  max-width: 15vw;
  height: 15vh;
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
 margin: 0;
 width: 20vw;
 height: 50vh;
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
  width: 80%;
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
 width: 80%;
 font-size: 20px;
 height: 35px;
 background-color: #60a567;
 color: #dfe9e0;
 border: 1px solid transparent;
 border-radius: 30px;
}
</style>
