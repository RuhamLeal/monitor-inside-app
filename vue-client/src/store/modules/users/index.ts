import { Module } from 'vuex';
import httpClient from '@/services/http';
import { State } from '@/interfaces/store';
import {
  EDITING, EDITUSER, GETUSERS, REGISTING, SHOWUSERS, PUTUSER, POSTUSER, DELETEUSER,
} from '@/store/actions-types';
import {
  users, editing, registing, userToEdit,
} from '@/store/states';
import { IUser } from '@/interfaces/IUser';

interface EstadoUsers {
  users: IUser[];
  editing: boolean,
  registing: boolean,
  userToEdit: IUser,
}

const usersModule: Module<EstadoUsers, State> = {
  state: () => ({
    editing,
    registing,
    userToEdit,
    users,
  }),
  mutations: {
    [SHOWUSERS](context, data) {
      context.users = data;
    },
    [EDITING](context, editing) {
      context.editing = editing;
    },
    [REGISTING](context, registing) {
      context.registing = registing;
    },
    [EDITUSER](context, data) {
      context.userToEdit = data;
    },
  },
  actions: {
    async [GETUSERS]({ commit }) {
      try {
        const token = localStorage.getItem('token') as string;

        const res = await httpClient.get('/user', {
          headers: {
            Authorization: token,
          },
        });

        commit(SHOWUSERS, res.data);

        return null;
      } catch (err: any) {
        if (!err.response) {
          return { err, message: 'Unable to fetch' };
        }

        return { message: err.response?.data.message };
      }
    },
    async [PUTUSER](context, data) {
      try {
        const token = localStorage.getItem('token') as string;

        await httpClient.put(
          '/user',
          {
            id: data.id,
            name: data.username,
            email: data.email,
            admin: data.admin,
            password: data.password,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );

        const { users } = context.state;

        const updatedUsers = users.filter((user) => user.id !== data.id);

        updatedUsers.push({
          id: data.id,
          name: data.username,
          email: data.email,
          admin: data.admin,
        });

        context.commit(SHOWUSERS, updatedUsers);

        return null;
      } catch (err: any) {
        if (!err.response) {
          return { err, message: 'Unable to fetch' };
        }

        return { message: err.response?.data.message };
      }
    },
    async [POSTUSER](context, data) {
      try {
        const token = localStorage.getItem('token') as string;

        const res = await httpClient.post(
          '/user/signin',
          {
            name: data.username,
            email: data.email,
            admin: data.admin,
            password: data.password,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );

        const { users } = context.state;

        users.push({
          id: res.data.id,
          name: data.username,
          email: data.email,
          admin: data.admin,
        });

        context.commit(SHOWUSERS, users);

        return null;
      } catch (err: any) {
        if (!err.response) {
          return { err, message: 'Unable to fetch' };
        }

        return { message: err.response?.data.message };
      }
    },
    async [DELETEUSER](context, data) {
      try {
        const token = localStorage.getItem('token') as string;

        await httpClient.delete(
          `/user/${data.id}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );

        const { users } = context.state;

        const filteredUsers = users.filter((user) => user.id !== data.id);

        context.commit(SHOWUSERS, filteredUsers);

        return null;
      } catch (err: any) {
        if (!err.response) {
          return { err, message: 'Unable to fetch' };
        }

        return { message: err.response?.data.message };
      }
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    editing(state) {
      return state.editing;
    },
    registing(state) {
      return state.registing;
    },
    userToEdit(state) {
      return state.userToEdit;
    },
  },
};

export default usersModule;
