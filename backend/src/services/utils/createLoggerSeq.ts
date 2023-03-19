import { Logger } from "seq-logging";

export function createLoggerSeq() {
  const logger = new Logger({
    serverUrl: (process.env.SEQ_URL as string),
    onError(err: Error) {}
  });

  return logger;
}
