<template>
  <section>
    <div>
      <h3>{{ name }}</h3>
      <h4>{{ email }}</h4>
      <h4 v-if="(admin)" >Tipo: Administrador</h4>
      <h4 v-else >Tipo: Usuario</h4>
    </div>
    <div id="buttons-container" >
      <button v-on:click="edicao">
        <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
        Editar
      </button>
      <button v-on:click="excluir">
        <font-awesome-icon icon="fa-solid fa-trash" />
        Excluir
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import {
  EDITING, REGISTING, EDITUSER, DELETEUSER,
} from '@/store/actions-types';
import { userToEdit } from '@/store/states';
import useNotificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificaçao';

export default defineComponent({
  name: 'userbox-component',
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();

    const edicao = () => {
      store.commit(REGISTING, false);
      store.commit(
        EDITUSER,
        {
          id: props.id,
          name: props.name,
          email: props.email,
          admin: props.admin,
        },
      );
      store.commit(EDITING, true);
    };

    const excluir = async () => {
      store.commit(REGISTING, false);
      store.commit(EDITING, false);
      store.commit(EDITUSER, userToEdit);

      const res = await store.dispatch(DELETEUSER, {
        id: props.id,
      });

      if (res?.message) {
        return notificar(TipoNotificacao.FALHA, 'Erro ao excluir usuario', res.message);
      }

      return notificar(TipoNotificacao.SUCESSO, 'Usuario excluido', props.name);
    };

    return {
      edicao,
      excluir,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>

#buttons-container {
  position: relative;
  right: 5%;
  display: flex;
  gap: 5px;
}
.user-box {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(1, 36, 66);
  background-color: rgb(224, 224, 224);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 0 0 4% 5%;
}

</style>
