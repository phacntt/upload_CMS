import express from 'express';
import cookieParser from 'cookie-parser'
import path from 'path';
import { Routes } from './interfaces/routes.interface';
import { NODE_ENV, PORT } from './config';
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser';

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
    // this.initializeStaticFile();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  private initializeStaticFile() {
    this.app.use(express.static(path.resolve(__dirname, '../dist/build'))); // khi có request static file *.js, *.css, *.font, *.jpg....
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist/build', 'index.html'));
    }); // khi có request tới một page của react app
  }

  private initializeMiddlewares() {
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

  private initializeCron() {
    
  }

}

export default App;
