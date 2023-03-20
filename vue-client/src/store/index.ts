import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

interface State {
  value: any,
}

export const key: InjectionKey<Store<State>> = Symbol('store key');

export const store = createStore<State>({
  state: {
    value: null,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
