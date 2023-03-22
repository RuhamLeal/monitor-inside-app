<template>
  <main>
    <article>
      <h1>CPU</h1>
      <h2>Modelo</h2>
      <h2>{{ serverStats.cpu.model }}</h2>
      <h2>Cores</h2>
      <h3>{{ serverStats.cpu.qty }}</h3>
    </article>
    {{serverStats}}
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { CONNECTSOCKET } from '@/store/actions-types';
import { IServerStats } from '@/interfaces/IServerStats';

export default defineComponent({
  name: 'dashboard-component',
  setup() {
    const store = useStore();

    store.dispatch(CONNECTSOCKET);

    const serverStats = computed(() => store.getters.serverStats) as unknown as IServerStats;

    return {
      serverStats,
    };
  },
});
</script>
