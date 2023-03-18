import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.router();

    this.app.get('/', (req, res) => res.json({ api: true, on: true }));
  }

  private router(): void {
    this.app.use(
      'api/v1',
      userRouter
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

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
