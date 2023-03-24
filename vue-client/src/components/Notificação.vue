<template>
  <div class="notificacoes">
    <article
      class="message-article"
      :class="notificationType[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="title">{{ notificacao.titulo }}</div>
      <div class="message">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificaçao';

export default defineComponent({
  name: 'notificação-box',
  data() {
    return {
      notificationType: {
        [TipoNotificacao.SUCESSO]: 'success',
        [TipoNotificacao.ATENCAO]: 'warning',
        [TipoNotificacao.FALHA]: 'danger',
      },
    };
  },
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 25px;
  z-index: 105;
}
.notificacoes article{
  gap: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 20px;
}

.notificacoes article .title{
  color: rgb(207, 201, 201);
  position: relative;
  font-weight: 600;
  text-decoration: underline;
  font-style: oblique;
  font-size: large;
  bottom: 18px;
}

.notificacoes article .message{
  color: rgb(207, 201, 201);
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial;
  position: relative;
  top: 5px;
}

.notificacoes .danger {
  background-color: rgb(136, 40, 40);
}
.notificacoes .warning {
  background-color: rgb(46, 24, 24);
}
.notificacoes .success {
  background-color: rgb(136, 40, 40);
  background-color: rgb(64, 100, 66);
}
</style>
