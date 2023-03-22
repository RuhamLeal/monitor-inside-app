<template>
  <form v-if="registing" @submit.prevent="null" class="user-form">
    <label class="user-form-input" for="username">
      Nome
      <input id="username" type="text">
    </label>
    <label class="user-form-input" for="email">
      Email
      <input id="email" type="text">
    </label>
    <label class="user-form-input" for="password">
      Password
      <input id="password" type="text">
    </label>
    <label for="admin">
      Admin
      <input id="admin" type="checkbox">
    </label>
    <div id="user-form-submit" >
      <button type="submit" >Salvar</button>
    </div>
  </form>
  <form v-if="editing" @submit.prevent="editar" class="user-form">
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
      <input  v-model="password" id="password" type="password">
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
  PUTUSER, EDITING, REGISTING, EDITUSER,
} from '@/store/actions-types';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificaçao';
import { userToEdit } from '@/store/states';

export default defineComponent({
  name: 'userform-component',
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();

    const username = computed(() => store.getters.userToEdit.name);
    const email = computed(() => store.getters.userToEdit.email);
    const admin = computed(() => store.getters.userToEdit.admin);
    const id = computed(() => store.getters.userToEdit.id);
    const password = ref('');

    const updateUserInputs = computed(() => ({
      username: ref(username.value),
      email: ref(email.value),
      admin: ref(admin.value),
    }));

    const editar = async () => {
      const res = await store.dispatch(PUTUSER, {
        id: id.value,
        username: updateUserInputs.value.username.value,
        email: updateUserInputs.value.email.value,
        admin: updateUserInputs.value.admin.value,
        password: password.value,
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
      password,
      editar,
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
