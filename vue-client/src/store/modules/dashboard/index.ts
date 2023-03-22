import { Module } from 'vuex';
import socket from 'socket.io-client';
import { State } from '@/interfaces/store';
import { CONNECTSOCKET, SERVERSTATS } from '@/store/actions-types';
import { IServerStats } from '@/interfaces/IServerStats';
import { serverStats } from '@/store/states';

interface EstadoDashboard {
  serverStats: IServerStats;
}

const dashboardModule: Module<EstadoDashboard, State> = {
  state: () => ({
    serverStats,
  }),
  mutations: {
    [SERVERSTATS](context, serverStats) {
      context.serverStats = serverStats;
    },
  },
  actions: {
    [CONNECTSOCKET]({ commit }) {
      const ioserver = socket('http://localhost:3001/');

      ioserver.on('server-stats', (data: IServerStats) => {
        const serverStats:IServerStats = {
          cpu: data.cpu,
          mem: data.mem,
          network: data.network,
          system: data.system,
          timestamp: data.timestamp,
        };

        commit(SERVERSTATS, serverStats);
      });
    },
  },
  getters: {
    serverStats(state) {
      return state.serverStats;
    },
  },
};

export default dashboardModule;
