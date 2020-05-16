import {Request, Response} from "express"
import {testController} from './controller'

export class Routes {

    public testController: testController = new testController();

    public routes(app: any): void {

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                status: "success"
            })
        });

        //Test
        app.route("/createList").post(this.testController.createList);

        app.route("/getRecords").get(this.testController.getRecords);
        
        app.route("/testmethod").get(this.testController.testmethod);

        //To implement!
        // app.route("/updateTask").post() 
        

        // app.route("/getLists").get()

        // app.route("/getIndividualList").get()

        // app.route("/deleteList").delete()
    }
}