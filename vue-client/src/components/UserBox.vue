<template>
  <section>
    <div>
      <h3>{{ name }}</h3>
      <h4>{{ email }}</h4>
      <h4 v-if="(admin)" >Tipo: Administrador</h4>
      <h4 v-else >Tipo: Usuario</h4>
    </div>
    <div id="buttons-container" >
      <button v-on:click="edicao">Editar</button>
      <button v-on:click="excluir">Excluir</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { EDITING, REGISTING, EDITUSER } from '@/store/actions-types';

export default defineComponent({
  name: 'userbox-component',
  setup(props) {
    const store = useStore();

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

    return {
      edicao,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
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
