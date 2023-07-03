import express, {Express} from 'express';
import { parseEnvNumber, parseEnvString } from './utils';
import { UserController } from './routes/users';
import { ComentarioController } from './routes/comentarios';
import  mongoose, { Mongoose } from 'mongoose';
import * as dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
export default class App {
    private appServer:Express;
    private port:number = parseEnvNumber('PORT' || '') ;
    private apiVersion:string = parseEnvString('API_VERSION' || '');
    private apiPrefix:string = parseEnvString('API_PREFIX' || '');
    private databasePort: number = parseEnvNumber('DATABASE_PORT' || ''); 
    private databaseHost: string = parseEnvString('DATABASE_HOST' || '');
    private databaseUser: string = parseEnvString('DATABASE_USER' || '');
    private databasePassword: string = parseEnvString('DATABASE_PASSWORD' || '');
    private databaseName: string = parseEnvString('DATABASE_NAME' || '');
    private databaseClient: Mongoose;
    constructor() {
        this.databaseClient = mongoose;
        this.appServer = express();
        this.setupServer();
        
    }
    private setupDatabase() {
        const connecitonString = `mongodb://${this.databaseUser}:${this.databasePassword}@${this.databaseHost}:${this.databasePort}/${this.databaseName}`;
        console.log('connection', connecitonString);
        this.databaseClient.connect(connecitonString);
        
        this.databaseClient.connection.on('error', (error) => {
            console.log(error);
        });

        this.databaseClient.connection.once('open', () => {
            console.log('Connected to database');
        });
    }
    
    public getClientMongoose():Mongoose {
        return this.databaseClient;
    }

    private setupServer():void {
        this.appServer.use(express.json());
        this.appServer.use(express.urlencoded({extended: true}));
        this.setupDatabase();
        this.initRoutes('users');
        this.comentRoutes('coments')
    }
    private initRoutes(service: string):void {
        const userController = new UserController(this, `/${this.apiVersion}/${this.apiPrefix}/${service}`);
        
    }
    private comentRoutes(service: string):void {
        const comentarioController = new ComentarioController(this, `/${this.apiVersion}/${this.apiPrefix}/${service}`);
        
    }
    public getAppServer():Express {
        return this.appServer;
    }
    public getPort():number {
        return this.port;
    }

}