import { connect, connection } from "mongoose";
import 'dotenv/config';

const mongooseConnection = () => {
  connect(
    process.env.MONGO_DB_URL as string, 
    {
      minPoolSize: 0,
      maxPoolSize: 30000,
      connectTimeoutMS: 30000,
      waitQueueTimeoutMS: 1200000,
    }
  );

  return connection; 
}

export default mongooseConnection;