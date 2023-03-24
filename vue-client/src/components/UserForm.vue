<template>
  <form v-if="registing" @submit.prevent="criarUsuario" class="user-form">
    <div class="back-button-container">
      <button v-on:click="voltar" class="back-button" type="button" >
        <font-awesome-icon icon="fa-solid fa-left-long" size="xl" style="color: #ffffff;" />
      </button>
    </div>
    <label class="user-form-input" for="username">
      Nome
      <input v-model="createUserInputs.username.value" id="username" type="text">
    </label>
    <label class="user-form-input" for="email">
      Email
      <input v-model="createUserInputs.email.value" id="email" type="text">
    </label>
    <label class="user-form-input" for="password">
      Password
      <input v-model="createUserInputs.password.value" id="password" type="password">
    </label>
    <label for="admin">
      Admin
      <input v-model="createUserInputs.admin.value" id="admin" type="checkbox">
    </label>
    <div id="user-form-submit" >
      <button type="submit" >Salvar</button>
    </div>
  </form>
  <form v-if="editing" @submit.prevent="editarUsuario" class="user-form">
    <div class="back-button-container" >
      <button v-on:click="voltar" class="back-button" type="button" >
        <font-awesome-icon icon="fa-solid fa-left-long" size="xl" style="color: #ffffff;" />
      </button>
    </div>
    <label class="user-form-input" for="username">
      Nome
      <input v-model="updateUserInputs.username.value" id="username" type="text">
    </label>
    <label class="user-form-input" for="email">
      Email
      <input v-model="updateUserInputs.email.value" id="email" type="text">
    </label>
    <label class="user-form-input" for="password">
      Password
      <input  v-model="updateUserInputs.password.value" id="password" type="password">
    </label>
    <label for="admin">
      Admin
      <input v-model="updateUserInputs.admin.value" id="admin" type="checkbox">
    </label>
    <div id="user-form-submit" >
      <button type="submit" >Salvar</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
import {
  PUTUSER, EDITING, REGISTING, EDITUSER, POSTUSER,
} from '@/store/actions-types';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificaçao';
import { userToEdit } from '@/store/states';
import userFormValidation from '@/services/validations/UserFormValidation';

export default defineComponent({
  name: 'userform-component',
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();

    const toUpdateUsername = computed(() => store.getters.userToEdit.name);
    const toUpdateEmail = computed(() => store.getters.userToEdit.email);
    const toUpdateAdmin = computed(() => store.getters.userToEdit.admin);
    const toUpdateId = computed(() => store.getters.userToEdit.id);

    const updateUserInputs = computed(() => ({
      username: ref(toUpdateUsername.value),
      email: ref(toUpdateEmail.value),
      admin: ref(toUpdateAdmin.value),
      password: ref(''),
    }));

    const createUserInputs = {
      username: ref(''),
      email: ref(''),
      admin: ref(false),
      password: ref(''),
    };

    const criarUsuario = async () => {
      const userData = {
        username: createUserInputs.username.value,
        email: createUserInputs.email.value,
        admin: createUserInputs.admin.value,
        password: createUserInputs.password.value,
      };

      const { err } = userFormValidation(userData);

      if (err) {
        return notificar(TipoNotificacao.FALHA, 'Erro no Form', err);
      }

      const res = await store.dispatch(POSTUSER, { ...userData });

      if (res?.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao criar usuario', res.message);
      }

      store.commit(EDITING, false);
      store.commit(REGISTING, false);

      notificar(TipoNotificacao.SUCESSO, 'Usuario Criado', createUserInputs.username.value);

      return null;
    };

    const editarUsuario = async () => {
      const userData = {
        username: updateUserInputs.value.username.value,
        email: updateUserInputs.value.email.value,
        admin: updateUserInputs.value.admin.value,
        password: updateUserInputs.value.password.value,
      };

      const { err } = userFormValidation(userData);

      if (err) {
        return notificar(TipoNotificacao.FALHA, 'Erro no Form', err);
      }

      const res = await store.dispatch(PUTUSER, {
        id: toUpdateId.value,
        ...userData,
      });

      if (res?.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao atualizar usuario', res.message);
      }

      store.commit(EDITING, false);
      store.commit(REGISTING, false);

      notificar(TipoNotificacao.SUCESSO, 'Usuario atualizado', updateUserInputs.value.username.value);

      store.commit(EDITUSER, userToEdit);

      return null;
    };

    const voltar = () => {
      store.commit(EDITING, false);
      store.commit(REGISTING, false);
      store.commit(EDITUSER, userToEdit);
    };

    return {
      editing: computed(() => store.getters.editing),
      registing: computed(() => store.getters.registing),
      updateUserInputs,
      createUserInputs,
      editarUsuario,
      criarUsuario,
      voltar,
    };
  },
});
</script>

<style>
.user-form {
  width: 70%;
  display: flex;
  margin-top: 20%;
  flex-direction: column;
  gap: 30px;
}
.user-form-input input {
  border: none;
  border-bottom: 1px solid #142638;
  background-color: rgb(233, 233, 233);
  padding-left: 5px;
  height: 30px;
}

.user-form-input {
  font-size: large;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.back-button-container {
  display: flex;
  justify-content: flex-end;
}

.back-button {
  border-radius: 5px;
  border: none;
  background-color: #142638;
  cursor: pointer;
}

#user-form-submit{
  display: flex;
  justify-content: center;
  width: 100%;
}

#user-form-submit button {
  border: none;
  color: wheat;
  background-color: rgb(41, 85, 41);
  height: 30px;
  width: 100%;
}
</style>
