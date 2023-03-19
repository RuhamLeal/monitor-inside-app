import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';
import HttpErrorMiddleware from './middlewares/HttpError';
import http from 'http';
import { Server } from 'socket.io';
import serverMonitoring from './services/serverMonitoring';

class App {
  public app: express.Express;
  public server: any;
  public io: any;

  constructor() {
    this.app = express();

    this.server = http.createServer(this.app);

    this.io = new Server(this.server);

    
    this.config();
    this.router();
    
    this.app.get('/', (req, res) => res.json({ api: true, on: true }));
  }

  private router(): void {
    this.app.use(
      '/api/v1',
      userRouter,
      HttpErrorMiddleware,
    );
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public async start(PORT: string | number): Promise<void> {
    serverMonitoring(this.io);
    this.server.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
