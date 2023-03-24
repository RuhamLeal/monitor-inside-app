<template>
  <main>
    <section id="stat-main-page">
      <article class="stat-container">
        <h1 class="golden-text-color">CPU</h1>
        <h2>Modelo</h2>
        <h2 id="cpu-model-text">{{ serverStats.cpu.model }}</h2>
        <h2>Quantidade de CPUs: {{ serverStats.cpu.qty }}</h2>
      </article>
      <article class="stat-container">
        <h1 class="golden-text-color">MEMÓRIA</h1>
        <h2>Total: {{ serverStats.mem.total }} Mbs</h2>
        <h2>Usada: {{ serverStats.mem.used }} Mbs</h2>
        <h2>Livre: {{ serverStats.mem.free }} Mbs</h2>
        <h2>Cache: {{ serverStats.mem.cache }} Mbs</h2>
      </article>
      <article class="stat-container">
        <h1 class="golden-text-color">SISTEMA</h1>
        <h2>{{ serverStats.system.name }}</h2>
        <h2>Iniciado a {{ serverStats.system.uptime }} minutos</h2>
      </article>
      <article class="stat-container">
        <h1 class="golden-text-color">DATE</h1>
        <h2>{{ serverStats.timestamp }}</h2>
      </article>
      <article class="stat-container">
        <h1 class="golden-text-color">NETWORKS</h1>
        <div v-for="network, idx in serverStats.networks" :key="idx">
          <span>
            Endereço {{ idx + 1 }}: {{ network.address.ip }}  ---  {{ network.address.family }}
          </span>
        </div>
      </article>
    </section>
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

<style>
#cpu-model-text {
  color: rgb(10, 23, 214);
}
.golden-text-color {
  color: rgba(206, 175, 0, 0.87);
}
#stat-main-page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  overflow-y:scroll;
}
.stat-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(1, 36, 66);
  background-color: rgb(224, 224, 224);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 2%;
  margin: 5% 3% 2% 5%;
  height: auto;
  min-width: 200px;
  width: auto;
}
.stat-container h1{
  text-decoration: underline;
  font-family: 'Times New Roman', Times, serif;
  position: relative;
  right: 10px;
  font-size: x-large;
  bottom: 30px;
}
</style>
