import terminate from "terminate";
import emitLog from "./utils/emitLog";
import mongooseConnection from "../models/mongooseClientConnection";
import { server_stats_model } from '../models/serverStats.model';
import getServerStats from "./utils/serverStats";

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

  emitLog(logger, null, 'Iniciando Monitoramento');

  setInterval(async () => {
    try {
      const serverStats = await getServerStats();
  
      if (typeof process.send === 'function') { 
        process.send(serverStats);
      }
  
    } catch(err) {
      emitLog(logger, err, 'Erro no algoritmo de monitoramento principal do process');
    }
  }, 1000);

  setInterval(async () => {
    try {
      const serverStats = await getServerStats();
  
      const stats = await server_stats_model.find();
  
      if (stats.length === 0) {
        await server_stats_model.create(serverStats);
      } else {
        await server_stats_model.findByIdAndUpdate(stats[0]['_id'], serverStats);
      }
  
    } catch(err) {
      emitLog(logger, err, 'Erro no algoritmo de escrita no mongo');
    }
  }, 5000);
}
