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

        //Test
        app.route("/createList").post(this.Controller.createList);

        app.route("/userdetails").post(this.Controller.userDetails);

        app.route("/getLists/:useremail").get(this.Controller.getRecords);
        
        app.route("/testmethod").get(this.Controller.testmethod);
        
        app.route("/addTodo/:useremail/:id").post(this.Controller.addTodo);
        //To implement!
        // app.route("/updateTask").post() 

        // app.route("/getIndividualList").get()

        // app.route("/deleteList").delete()
    }
}