import express from "express";
import * as bodyParser from "body-parser";
import mongoose from 'mongoose'
import {Routes} from './appRoutes'

class App {
    public app: express.Application;
    public routes: Routes = new Routes()
    public url: string
    public db: mongoose.Connection

    constructor() {
        this.app = express();
        this.config()
        this.routes.routes(this.app);
        this.url =  "mongodb+srv://ash2:jain@cluster0-lj2nn.mongodb.net/test?retryWrites=true&w=majority";
        console.log(this.url)
    }
    
    public config(): void {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.json({limit: "1mb"}));
        mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
            .then(()=> {
                console.log("connected!")
                this.db = mongoose.connection
            })
            .catch((err: Error): void => {
            console.log(err.message)
        })
    }
}

export default new App()