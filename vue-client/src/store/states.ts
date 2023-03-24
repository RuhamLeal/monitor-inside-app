export const serverStats = {
  cpu: {
    model: '...',
    qty: 0,
  },
  mem: {
    cache: 0,
    free: 0,
    total: 0,
    used: 0,
  },
  networks: [{ address: { ip: '0.0.0.0', family: '...' } }],
  system: { name: '...', uptime: 0 },
  timestamp: '...',
};

export const notificacoes = [];

export const users = [];

export const editing = false;

export const registing = false;

export const userToEdit = {
  id: 0,
  name: '',
  email: '',
  admin: false,
};

export const cleanUserState = {
  editing,
  registing,
  users,
  userToEdit,
};
