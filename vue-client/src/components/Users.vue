<template>
  <main>
    <section id="users-main-page">
      <div id="users-container">
        <UserBox
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :id=" user.id"
        :email="user.email"
        :admin="user.admin"
        class="user-box"
        />
      </div>
      <div id="users-form-container">
        <button v-on:click="activeNewUserForm" >Novo usuario</button>
        <UserForm />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { EDITING, GETUSERS, REGISTING } from '@/store/actions-types';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificaçao';
import UserBox from './UserBox.vue';
import UserForm from './UserForm.vue';

export default defineComponent({
  name: 'users-component-2',
  components: {
    UserBox,
    UserForm,
  },
  setup() {
    const { notificar } = useNotificador();
    const store = useStore();

    const getUser = async () => {
      const res = await store.dispatch(GETUSERS);

      if (res?.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao mostrar Usuarios', res.message);
      }
      return null;
    };

    getUser();

    const users = computed(() => store.getters.users);

    const activeNewUserForm = () => {
      store.commit(EDITING, false);
      store.commit(REGISTING, true);
    };

    return {
      users,
      activeNewUserForm,
    };
  },
});
</script>

<style>
  #users-form-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 40%;
  }
  #users-main-page {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  #users-container {
    flex-direction: column;
    display: flex;
    width: 60%;
    height: 100%;
  }
  .user-box:nth-child(1) {
    margin: 5% 0 0 6%;
  }
  .user-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2% 0 0 6%;
    padding: 1% 0 1% 5%;
  }
  .user-box h3 {
    font-size: 25px;
    position: relative;
    bottom: 10px;
    right: 20px;
  }
</style>
