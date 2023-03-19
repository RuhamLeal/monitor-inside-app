import os from 'os';
import terminate from "terminate";
import emitLog from "./utils/emitLog";
import mongooseConnection from "../models/mongooseClientConnection";
import { server_stats_model } from '../models/serverStats.model';
import si from 'systeminformation';

process.on("message", (data) => serverStatsProcess(data));

export function serverStatsProcess(logger: any) {
  const exit = () => terminate(process.pid);

  process
    .on("uncaughtException", (error) => {
      emitLog(logger, error, 'uncaughtException');
      exit();
    })
    .on("unhandledRejection", (error: Error, promise: Promise<any>) => {
      emitLog(logger, error, 'uncaughtException', promise);
      exit();
    });

  const mongodb = mongooseConnection();

  mongodb.on("error", (error: Error) => {
    emitLog(logger, error, 'Falha ao conectar no mongo - Stats Process');
    exit();
  })

  mongodb.once("open", () => emitLog(logger, null, 'Conectado no mongo - Stats Process'));

  setInterval(async () => {
    try {
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
          uptime: os.uptime(),
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
  
      if (typeof process.send === 'function') { 
        process.send(serverStats);
      }

      const stats = await server_stats_model.find();
  
      if (stats.length === 0) {
        await server_stats_model.create(serverStats);
      }
  
      await server_stats_model.findByIdAndUpdate(stats[0]['_id'], serverStats);
    } catch(err) {
      emitLog(logger, err, 'Erro no algoritmo principal do process');
    }
  }, 4000);
}
