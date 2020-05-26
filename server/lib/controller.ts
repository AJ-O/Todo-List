import App from './app'
import mongoose from 'mongoose'
import {UserLists} from './models'
import {Request, Response} from 'express'

const listModel = mongoose.model('list', UserLists);

export class testController{

    testController(){
        let db = App.db;    
        console.log(db)
    }

    public createList(req: Request, res: Response) {
        
        console.log(req.body);
        //remove email
        listModel.updateOne({useremail: req.body.email}, {$push: {TodoLists: req.body}}, done)
        function done() {
            console.log("done")
            res.send({status: "success"});
        }
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
            useremail: "abc@gmail.com",
            TodoLists: todos
        }

        let lm = new listModel(testObj);
        lm.save((err, data) => {
            if(err) {
                console.log(err)
            } else {
                res.send(data);
            }
        });
    }

    public getRecords(req: Request, res: Response) {
        console.log("called get");

        let userId: String;
        let useremail: string = req.params.useremail;
        useremail = useremail.replace(":", "");
        console.log("useremail: ", useremail);

        listModel.find({useremail: useremail}, (err, data) => {
            if(err){
                res.send(err);
                console.log(err);
            } else{
                let resObj = {
                    status: "success",
                    data: data
                }
                res.send(resObj);
                console.log("called get all");
            }
        })
    }

    public userDetails(req: Request, res: Response) {

        let useremail = req.body.useremail;
        listModel.find({useremail: useremail}, (err, data) => {
            let retObj = {};
            if (err) {
                console.log(err);
                retObj["status"] = 400;
                res.send(retObj);
            } else {

                if (data.length == 0) {
                    console.log(data, data.length)
                    retObj["userExists"] = false;
                    retObj["code"] = 200;

                    let newUser = new listModel({useremail: useremail});
                    newUser.save((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                        res.send(retObj);
                    });

                } else {
                    retObj["code"] = 200;
                    retObj["userExists"] = true;
                    retObj["lists"] = data[0]["TodoLists"];
                    res.send(retObj);
                }
            }
            console.log(retObj);
        });
    }
}