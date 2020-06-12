import App from './app'
import mongoose from 'mongoose'
import {UserLists} from './models'
import {Request, Response} from 'express'

const listModel = mongoose.model('list', UserLists);

export class Controller{

    Controller(){
        let db = App.db;    
        console.log(db)
    }

    public createList(req: Request, res: Response) {
        
        let useremail = req.params.useremail;
        console.log(useremail);
        listModel.findOneAndUpdate({useremail: useremail}, {$push: {TodoLists: req.body}}, (err, data) => {
            console.log("done")

            if(err) {
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                })
            }
            else {
                res.send({
                    code: 200,
                    data: data[0],
                    status: "success"
                });
            }
        });
    }
    
    public getRecords(req: Request, res: Response) {

        const useremail: string = req.params.useremail;
        console.log("useremail: ", useremail);

        listModel.find({useremail: useremail}, (err, data) => {
            console.log("called get all");
            if(err){
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                });
            } else{
                res.send({
                    code: 200,
                    data: data[0],
                    status: "success"
                });
            }
        })
    }

    public userDetails(req: Request, res: Response) {

        const useremail = req.body.useremail;

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
        });
    }

    public addTodo(req: Request, res: Response) {

        const useremail = req.params.useremail;
        const todoListId = req.params.id;
        const todo = req.body;
        console.log(useremail, todoListId, todo);
        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": todoListId}, {$push: {"TodoLists.$.todos": todo}}, (err, data) => {
            if(err) {
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                });
            } else {
                listModel.find({useremail: useremail}, (err, data) => {
                    res.send({
                        code: 200,
                        data: data[0],
                        status: "success"
                    })
                })
            }
        });
    }

    public deleteTodoItem(req: Request, res: Response) {
        const useremail = req.params.useremail;
        const deleteTodoId = req.params.todoId;
        const todoListId = req.params.listId;

        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": todoListId}, {$pull: {"TodoLists.$.todos": {id: deleteTodoId}}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                })
            } else {
                console.log("item deleted");
                listModel.find({useremail: useremail}, (err, data) => {
                    res.send({
                        code: 200,
                        data: data[0],
                        status: "success"
                    })
                });
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
                    err: err,
                    status: "error"
                });
            } else {
                console.log("done");
                
                listModel.find({useremail: useremail}, (err, data) => {
                    res.send({
                        code: 200,
                        data: data[0],
                        status: "success"
                    });
                })
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
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                })
            } else {
                console.log("updatedtime!");
                res.send({
                    code: 200,
                    data: data,
                    status: "success"
                });
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
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                })
            } else {
                console.log("updatedtask!");
                res.send({
                    code: 200,
                    data: data,
                    status: "success"
                });
            }
        });
    }

    public updateTitle(req: Request, res: Response) {

        const useremail = req.params.useremail;
        const listId = req.body.listId;
        const updatedTitle = req.body.value;
        console.log(useremail, listId, updatedTitle);

        listModel.findOneAndUpdate({useremail: useremail, "TodoLists.id": listId}, {$set: {"TodoLists.$.title": updatedTitle}}, (err, data) => {
            if (err) {
                console.log(err);
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                })

            } else {
                console.log("updated title!");
                res.send({
                    code: 200,
                    data: data,
                    status: "success"
                });
            }
        })
    }

    public deleteTodoList(req: Request, res: Response) {

        const useremail = req.params.useremail;
        const listId = req.params.listId;

        listModel.findOneAndUpdate({useremail: useremail}, {$pull: {TodoLists: {id: listId}}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({
                    code: 400,
                    err: err,
                    status: "error"
                })
            } else {
                console.log("list deleted!");
                
                listModel.find({useremail: useremail}, (err, data) => {
                    res.send({
                        code: 200,
                        data: data[0],
                        status: "success"
                    });
                })
            }
        })
    }
}