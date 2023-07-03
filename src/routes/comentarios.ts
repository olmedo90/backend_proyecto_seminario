import { Express } from 'express';
import  { ComentarioModel , IComentarios} from '../routes/schemas/Comentario';
import {
	StatusCodes,
} from 'http-status-codes';
import App from '../app';
import { Model, Schema } from 'mongoose';
export class ComentarioController {
    private route: string;
    private app: App;
    private express: Express;
    private comentario: Model<IComentarios>;
    constructor(app: App, route: string) {
        this.route = route;
        console.log('route', this.route);
        this.app = app;
        this.express = this.app.getAppServer();
        // this.comentario is a Model object
        this.comentario = ComentarioModel(this.app.getClientMongoose());

        this.initRoutes();
        
    }
    private initRoutes(): void {
        
        this.express.get(this.route, async(req, res) => {
            const list =  await this.comentario.find();
            res.status(StatusCodes.ACCEPTED).json({list});
        });
        
        this.express.post(this.route, async (req, res) => {            
            const requestObject = {...req.body};
            console.log('requestObject', requestObject);
            const newComent = new this.comentario(requestObject);
            const result = await newComent.save();
            if (result) {
                res.status(StatusCodes.CREATED).json(result);
                return;
            }
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
            
        });
        
        // this.express.put(`${this.route}/:id`, async(req, res) => {
        //     const { email, username, password } = req.body;
        //     const { id } = req.params;
        //     const result = await this.comentario.findOneAndUpdate({_id: id}, {email: email, username:username, password:password});
        //     res.status(StatusCodes.OK).json({msg: result});
        // });

        // this.express.delete(`${this.route}/:id`, async(req, res) => {
        //     const { id } = req.params;
        //     const result = await this.comentario.findOneAndDelete({_id: id});
        //     res.status(StatusCodes.OK).json({msg: result});
        // });
    }
}