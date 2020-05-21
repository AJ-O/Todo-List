import express from "express";
import * as bodyParser from "body-parser";
import mongoose from 'mongoose'
import {Routes} from './appRoutes'
import dotenv from 'dotenv'
dotenv.config()

class App {
    public app: express.Application;
    public routes: Routes = new Routes()
    public url: string
    public db: mongoose.Connection

    constructor() {
        this.app = express();
        this.config()
        this.routes.routes(this.app);
    }
    
    public config(): void {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.json({limit: "1mb"}));

        let username = process.env.userName
        let pass = process.env.pass
        let url = `mongodb+srv://${username}:${pass}@cluster0-lj2nn.mongodb.net/TodoList-App?retryWrites=true&w=majority`
        
        mongoose.connect(url, {
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