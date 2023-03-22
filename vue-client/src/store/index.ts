import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { State } from '@/interfaces/store';
import { INotificacao } from '@/interfaces/INotificaçao';
import loginModule from './modules/login';
import dashboardModule from './modules/dashboard';
import usersModule from './modules/users';
import { NOTIFICAR } from './actions-types';
import { notificacoes } from './states';

export const key: InjectionKey<Store<State>> = Symbol('store key');

export const store = createStore<State>({
  state: {
    notificacoes,
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes
          .filter((notificacao) => notificacao.id !== novaNotificacao.id);
      }, 4000);
    },
  },
  modules: {
    loginModule,
    dashboardModule,
    usersModule,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
