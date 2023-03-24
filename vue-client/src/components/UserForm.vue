<template>
  <form v-if="registing" @submit.prevent="criarUsuario" class="user-form">
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
      const res = await store.dispatch(POSTUSER, {
        username: createUserInputs.username.value,
        email: createUserInputs.email.value,
        admin: createUserInputs.admin.value,
        password: createUserInputs.password.value,
      });

      if (res?.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao criar usuario', res.message);
      }

      store.commit(EDITING, false);
      store.commit(REGISTING, false);

      notificar(TipoNotificacao.SUCESSO, 'Usuario Criado', createUserInputs.username.value);

      return null;
    };

    const editarUsuario = async () => {
      const res = await store.dispatch(PUTUSER, {
        id: toUpdateId.value,
        username: updateUserInputs.value.username.value,
        email: updateUserInputs.value.email.value,
        admin: updateUserInputs.value.admin.value,
        password: updateUserInputs.value.password.value,
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

    return {
      editing: computed(() => store.getters.editing),
      registing: computed(() => store.getters.registing),
      updateUserInputs,
      createUserInputs,
      editarUsuario,
      criarUsuario,
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
  gap: 15px;
}
.user-form-input {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
#user-form-submit{
  display: flex;
  justify-content: center;
}
</style>
