import {Request, Response} from "express"
import {Controller} from './controller'

export class Routes {

    public Controller: Controller = new Controller();

    public routes(app: any): void {

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                status: "success"
            })
        });

        app.route("/createList/:useremail").post(this.Controller.createList);

        app.route("/userdetails").post(this.Controller.userDetails);

        app.route("/getLists/:useremail").get(this.Controller.getRecords);
        
        app.route("/addTodo/:useremail/:id").post(this.Controller.addTodo);
        
        app.route("/deleteTodoItem/:useremail/:listId/:todoId").delete(this.Controller.deleteTodoItem);

        app.route("/completeTodo/:useremail").post(this.Controller.modifyTodoStatus);

        app.route("/updateTask/:useremail").post(this.Controller.updateTask);

        app.route("/updateTime/:useremail").post(this.Controller.updateTime);

        app.route("/updateTitle/:useremail").post(this.Controller.updateTitle);
        
        app.route("/deleteTodoList/:useremail/:listId").delete(this.Controller.deleteTodoList);
    }
}