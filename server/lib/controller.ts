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
        
        let useremail = req.params.useremail;
        console.log(useremail);
        listModel.findOneAndUpdate({useremail: useremail}, {$push: {TodoLists: req.body}}, done) //operator to push to object
        function done() {
            console.log("done")
            res.send({
                status: "success",
                code: 200
            });
        }
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
    }

    public modifyTodoStatus(req: Request, res: Response) {
        
        const useremail = req.params.useremail;
        const listId = req.body.listId;
        const todoId = req.body.todoId;
        console.log(useremail, listId, todoId);
        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": listId}, {$set: {"TodoLists.$.todos.$[id].isCompleted": true}}, {arrayFilters: [{"id.id": todoId}]}, (err, data) => {
            if(err) {
                res.send({
                    code: 400,
                    err: err
                });
            } else {
                console.log("done");
                res.send({
                    code: 200,
                    message: "success"
                });
            }
        })

    }

    public updateTime(req: Request, res: Response) {
        
        const useremail = req.params.useremail;
        const listId = req.body.listId;
        const todoId = req.body.todoId;
        const updatedTime = req.body.value;
        
        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": listId},{$set: {"TodoLists.$.todos.$[id].setTime": updatedTime}}, {arrayFilters: [{"id.id": todoId}]}, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                console.log("updatedtime!");
            }
        });
    }

    public updateTask(req: Request, res: Response) {
        
        const useremail = req.params.useremail;
        const listId = req.body.listId;
        const todoId = req.body.todoId;
        const updatedTask = req.body.value;

        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": listId}, {$set: {"TodoLists.$.todos.$[id].task": updatedTask}}, {arrayFilters: [{"id.id": todoId}]}, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                console.log("updatedtask!");
            }
        });
    }

    public updateTitle(req: Request, res: Response) {

        const useremail = req.params.useremail;
        console.log(req.body);
        const listId = req.body.listId;
        const updatedTitle = req.body.value;
        console.log(useremail, listId, updatedTitle);

        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": listId}, {$set: {"TodoLists.$.title": updatedTitle}}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("updated title!");
            }
        })
    }

    public deleteTodoList(req: Request, res: Response) {

        const useremail = req.params.useremail;
        const listId = req.params.listId;

        listModel.findOneAndUpdate({useremail: useremail}, {$pull: {TodoLists: {id: listId}}}, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                console.log("data: ", data["TodoLists"]);
            }
        })
    }
}