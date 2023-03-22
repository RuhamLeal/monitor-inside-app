interface network {
  address: {
    family: string;
    ip: string;
  }
}

export interface IServerStats {
  cpu: {
    model: string;
    qty: number;
  },
  mem: {
    cache: number;
    free: number;
    total: number;
    used: number;
  },
  network: network[];
  system: {
    name: string;
    uptime: number;
  },
  timestamp: string;
}
