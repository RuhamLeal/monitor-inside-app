import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { State } from '@/interfaces/store';
import loginModule from './modules/login';
// import httpClient from '@/services/http';
// import { LOGIN } from './actions-types';

export const key: InjectionKey<Store<State>> = Symbol('store key');

export const store = createStore<State>({
  state: {
    value: null,
  },
  modules: {
    loginModule,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
