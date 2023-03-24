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
        <div id="new-user-button-container">
          <button id="new-user-button" v-on:click="activeNewUserForm" >
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
            Criar Novo usuario
          </button>
        </div>
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

<style scoped>
  #new-user-button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 5%;
    margin-right: 25%;
  }
  #new-user-button {
    background-color: rgb(233, 233, 233);
    border: 0px;
    cursor: pointer;
    font-size: x-large;
  }
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
  #users-container, ::-webkit-scrollbar{
    width: 0;
  }
  #users-container {
    overflow-y:scroll;
    flex-direction: column;
    display: flex;
    padding: 5%;
    width: 60%;
    max-height: 100%;
  }
  .user-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3%;
    padding: 1% 0 1% 5%;
  }
  .user-box h3 {
    font-size: 25px;
    position: relative;
    bottom: 10px;
    right: 20px;
  }
</style>
