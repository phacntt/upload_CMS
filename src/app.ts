import express from 'express';
import cookieParser from 'cookie-parser'
import { Routes } from './interfaces/routes.interface';
import { CREDENTIALS, NODE_ENV, ORIGIN, PORT } from './config';
import { task } from './utils/task-cron';
import cors from 'cors'
import errorMiddleware from './middlewares/error.middleware';
import helmet from 'helmet';
import initRedis from './utils/initRedis';
import { handleSubcribeChannel } from './message-channel/subcrible';
import defaultPushEventManager from "./utils/pushEventManager"
import fileUpload from 'express-fileupload';
// import { InitKafka } from './utils/initKafka';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 8080;
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeCron();
    this.initializeErrorHandling();
    this.initializeRedis();
    this.initializeBridge();
    // this.consumeTopic();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser());

  }

  private initializeRoutes(routes: Routes[]) {
    this.app.use(fileUpload())
    routes.forEach(route => {
      this.app.use('/api' + route.path, route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeCron() {
    task()
  }

  private initializeRedis() {
    initRedis()
  }

  // private async consumeTopic() {
  //   const kafkaConfig = new InitKafka();
  //   // await kafkaConfig.send('blabla', [{
  //   //   key: '1234',
  //   //   value: JSON.stringify({data: 3})
  //   // }])

  //   await kafkaConfig.receive('my-topic', (value: any) => {
  //     console.log('VALUE: ', value);
  //   })
  // }

  private async initializeBridge() {
    await handleSubcribeChannel(defaultPushEventManager)
  }
}

export default App;
