import { Logger } from "seq-logging";

export default function emitLog(logger: Logger, instance: any, message: string, aditional: any = '*') {
  try {
    logger.emit({
      timestamp: new Date(),
      level: "Information",
      messageTemplate: message,
      properties: {
        promise: aditional,
        error:
        instance instanceof Error
            ? {
              message: instance?.message,
              stack: instance?.stack,
            }
            : instance,
      },
    });
  } catch(err) {
    console.log('#########################');
    console.log(new Date());
    console.log(message);
    console.error(instance);
    console.log('Logger Seq offline');
    console.log('#########################');
  }
}
