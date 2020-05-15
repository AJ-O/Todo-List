import App from './app'
import mongoose from 'mongoose'
import {testSchema} from './models'
import {Request, Response} from 'express'

const testModel = mongoose.model('test', testSchema)
console.log(mongoose.models)
export class testController{

    public db: mongoose.Connection;

    testController(){
        this.db = App.db;
    }

    public testthis(req: Request, res: Response) {

        let newTest = new testModel(req.body)
        newTest.save((err, data) => {
            if(err){
                console.log(err)
                res.send(err)
            }
            console.log("called!")
            res.json(data);
        });
    }

    public getRecords(req: Request, res: Response) {
        testModel.find({}, (err, data) => {
            if(err){
                res.send(err)
            } else{
                console.log(data);
                res.send(data);
                console.log("called get all")
            }
        })
    }
}