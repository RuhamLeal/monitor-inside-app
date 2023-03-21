import { fork } from "node:child_process";
import { createLoggerSeq } from "./utils/createLoggerSeq";
import emitLog from "./utils/emitLog";
import { Server } from 'socket.io';

export default async function serverMonitoring(socket: Server) {
  const logger = createLoggerSeq();

  process
    .on("uncaughtException", (error) => emitLog(logger, error, 'uncaughtException'))
    .on("unhandledRejection", (error: Error, promise: Promise<any>) => emitLog(logger, error, 'unhandledRejection', promise));

  createChild(socket);

  async function createChild(socket: Server) {
    const child = fork(__dirname + "/serverStatsProcess.js");
    const logger = createLoggerSeq();

    child.on("exit", (code, signal) => {
      emitLog(logger, code, 'Restartando monitoramento', signal);
      createChild(socket);
    });

    child.on("message", (data) => {
      socket.sockets.emit('server-stats', data);
    });

    child.on("error", (err) => {
      emitLog(logger, err, 'Erro no monitoramento');
      child.kill();
    });

    child.send(logger);
  }
}