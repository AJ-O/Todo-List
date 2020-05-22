import App from './app'
import mongoose from 'mongoose'
import {TodoList, UserLists} from './models'
import {Request, Response} from 'express'

const testModel = mongoose.model('test2', TodoList);
const listModel = mongoose.model('list', UserLists);
export class testController{

    testController(){
        let db = App.db;    
        console.log(db)
    }

    public createList(req: Request, res: Response) {

        let newTest = new testModel(req.body)
        

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

        let todoList1 = {
            title: "testTitle",

            todoItems: [
                {
                    isCompeleted: false,
                    task: "task1",
                    id: "001",
                    setTime: "09:09:12"
                },
                {
                    isCompeleted: false,
                    task: "task2",
                    id: "002",
                    setTime: "09:09:12"
                },
                {
                    isCompeleted: false,
                    task: "task3",
                    id: "003",
                    setTime: "09:09:12"
                }
            ]
        }

        let todoList2 = {
            title: "testTitle2",

            todoItems: [
                {
                    isCompeleted: false,
                    task: "task11",
                    id: "004",
                    setTime: "19:09:12"
                },
                {
                    isCompeleted: false,
                    task: "task12",
                    id: "005",
                    setTime: "19:09:12"
                },
                {
                    isCompeleted: false,
                    task: "task13",
                    id: "006",
                    setTime: "19:09:12"
                }
            ],
        }
        let todos = [todoList1, todoList2]

        let testObj = {
            userid: {
                username: "ashpak",
                TodoLists: todos,
            }
        }
        
        console.log("called test");
        console.log(testObj);

        let newTest = new listModel(testObj);
        newTest.save((err, data) => {
            if(err) {
                console.log(err);
            } else {
                console.log(data, "data saved!");
                res.send(data);
            }
        })
    }

    public getRecords(req: Request, res: Response) {
        console.log("called get")
        listModel.find({}, (err, data) => {
            if(err){
                res.send(err)
                console.log(err);
            } else{
                let resObj = {
                    status: "success",
                    data: data
                }
                res.send(resObj);
                console.log("called get all")
            }
        })
    }

    public userDetails(req: Request, res: Response) {
        console.log(req.body);
        let obj = {
            status: "success"
        }
        res.send(obj);
    }
}