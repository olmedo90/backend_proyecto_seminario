import { Express } from 'express';
import {
	StatusCodes,
} from 'http-status-codes';
import User from './schemas/User';
import App from '../app';
export class UserController {
    private route: string;
    private app: App;
    private express: Express;
    constructor(app: App, route: string) {
        this.route = route;
        this.app = app;
        this.express = this.app.getAppServer();
        this.initRoutes();
    }
    private initRoutes(): void {
        
        this.express.get(this.route, (req, res) => {
            this.app.getClient().model('User').find().then((users) => {
                res.status(StatusCodes.OK).json(users);
            }).catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            });
            //res.status(StatusCodes.ACCEPTED).json({msg: 'User service!'});
        });
        
        this.express.post(this.route, (req, res) => {
            //todo sanitize req.body 1
            //todo validate req.body 2
            //todo create user model 3
            const user = new User(req.body);
            user.save().then((user) => {
                res.status(StatusCodes.CREATED).json(user);
            }).catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            });
        });
        
        this.express.put(this.route, (req, res) => {
            res.status(StatusCodes.OK).json({msg: 'User service!'});
        });

        this.express.delete(this.route, (req, res) => {
            res.status(StatusCodes.OK).json({msg: 'User service!'});
        });
    }
}