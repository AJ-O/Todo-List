import App from './app'
import mongoose from 'mongoose'
import {UserLists, TodoList} from './models'
import {Request, Response} from 'express'

const listModel = mongoose.model('list', UserLists);
const todoModel = mongoose.model('todos', TodoList);

export class Controller{

    Controller(){
        let db = App.db;    
        console.log(db)
    }

    public createList(req: Request, res: Response) {
        
        console.log(req.body);
        //extract todo list id, set that as they key
        listModel.updateOne({useremail: req.body.email}, {$push: {TodoLists: req.body}}, done) //operator to push to object
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
            //console.log(retObj);
        });
    }

    public addTodo(req: Request, res: Response) {
        //console.log(req.body, req.params);
        let useremail = req.params.useremail;
        let todoListId = req.params.id;
        let todo = req.body;
        console.log(useremail, todoListId, todo);
        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": todoListId}, {$push: {"TodoLists.$.todos": todo}}, (err, data) => {
            if(err) {
                res.send({
                    status: "error",
                    code: 400
                });
                console.log(err);
            } else {
                console.log("done");
                res.send({
                    status: "success",
                    code: 200,
                    data: data
                })
            }
        });
    }

    public deleteTodoItem(req: Request, res: Response) {
        let useremail = req.params.useremail;
        let deleteTodoId = req.params.todoId;
        let todoListId = req.params.listId;
        console.log(useremail, todoListId, deleteTodoId);

        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": todoListId}, {$pull: {"TodoLists.$.todos": {id: deleteTodoId}}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({
                    message: err,
                    code: 400
                })
            } else {
                console.log("data: ", data["TodoLists"]);
                res.send({
                    message: "success",
                    code: 200
                })
            }
        });

        //deletes the whole list
        // listModel.findOneAndUpdate({useremail: useremail}, {$pull: {TodoLists: {todos: {$elemMatch: {id: deleteTodoId}}}}}, (err, data) => {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         console.log("data: ", data["TodoLists"]);
        //     }
        // })
    }
}