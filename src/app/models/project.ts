import { User } from "src/app/models/user";

export class Project {
    ProjectId: number;
    Priority:number;
    ProjectName:string;
    Startdate:Date;
    Enddate:Date;
    ProjectManagerid:number ;
    ProjectManager:User ;
    TotNoofTasks:number;
    NoofTasksCompleted:number;
    //TaskParent:Task;

}
