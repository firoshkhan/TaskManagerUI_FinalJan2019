import { User } from "src/app/models/user";
import {Project } from "src/app/models/project";

export class Task {
    TaskId: number;
    Priority:number;
  
    TaskName:string;
    Startdate:Date;
    Enddate:Date;
    TaskParentId:number;
    TaskParent:Task;
    TaskUserId:number ;
    TaskUser:User ;
    TaskProjectId:number ;
    TaskProject:Project ;
    Status:string;
    IsParentTask:Boolean;

}
