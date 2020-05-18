import App from './app'
import mongoose from 'mongoose'
import {TodoList} from './models'
import {Request, Response} from 'express'

const testModel = mongoose.model('test2', TodoList)
export class testController{

    testController(){
        let db = App.db;    
        console.log(db)
    }

    public createList(req: Request, res: Response) {

        // let newTest = new testModel(req.body)

        let db = App.db
        db.collection("TodoList").insertMany(req.body).then(()=>{
            res.json({response: "success"})
        }).catch((err) => {
            res.send(err)
        })
        // newTest.save((err, data) => {
        //     if(err){
        //         console.log(err)
        //         res.send(err)
        //     }
        //     console.log("called!")
        //     res.json(data);
        // });
    }

    public testmethod(req: Request, res: Response) {
        let db = App.db;    
    }

    public getRecords(req: Request, res: Response) {
        console.log("called get")
        testModel.find({}, (err, data) => {
            if(err){
                res.send(err)
                console.log(err);
            } else{
                console.log(data);
                res.send(data);
                console.log("called get all")
            }
        })
    }
}