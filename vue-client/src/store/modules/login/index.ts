import { Module } from 'vuex';
import httpClient from '@/services/http';
import { State } from '@/interfaces/store';
import { LOGIN } from '@/store/actions-types';

const loginModule: Module<null, State> = {
  actions: {
    async [LOGIN](_context, loginData) {
      try {
        const res = await httpClient.post('/user/login', {
          email: loginData.email,
          password: loginData.password,
        });

        return res.data;
      } catch (err: any) {
        if (!err.response) {
          return { err, message: 'Unable to fetch' };
        }

        return { message: err.response?.data.message };
      }
    },
  },
};

export default loginModule;
