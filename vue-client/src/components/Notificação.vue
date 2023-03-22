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
  border-radius: 30px;
}

.notificacoes article .title{
  position: relative;
  right: 70px;
  bottom: 20px;
}

.notificacoes .danger {
  background-color: rgb(187, 37, 37);
}
.notificacoes .warning {
  background-color: rgb(146, 26, 26);
}
.notificacoes .success {
  background-color: rgb(134, 211, 138);
}
</style>
