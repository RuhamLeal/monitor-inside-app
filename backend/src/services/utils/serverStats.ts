import os from 'os';
import si from 'systeminformation';

export default async function getServerStats() {
  const mem = await si.mem();
  const serverStats = {
    timestamp: new Date(),
    cpu: { 
      model: os.cpus()[0].model,
      qty: os.cpus().length,
    },
    mem: {
      total: Math.floor(mem.total / (1024 ** 2)),
      free: Math.floor(mem.free / (1024 ** 2)),
      used: Math.floor(mem.used / (1024 ** 2)),
      cache: Math.floor(mem.buffcache / (1024 ** 2))
    },
    system: {
      name: os.type(),
      uptime: Math.floor((os.uptime()) / 60),
    },
    networks: new Array(),
  };

  Object.values(os.networkInterfaces())
    .forEach((network) => network?.forEach((netInterface) => {
      const interfaceFormated = {
        address: {
          ip: netInterface.address,
          family: netInterface.family,
        }
      };

      serverStats.networks.push(interfaceFormated);
    }));

  return serverStats;
}