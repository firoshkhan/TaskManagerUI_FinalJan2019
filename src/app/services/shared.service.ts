
import {catchError,map,tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from  'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
//import {catchError, map, tap } from 'rxjs/operators';
import {throwError} from 'rxjs';
//import { HttpClient, HttpErrorResponse} from '@angular/common/http';


import { Task } from '../models/task';
import { User } from '../models/user';
import { Project } from '../models/project';
import { HttpModule } from '@angular/http';
//import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders,HttpErrorResponse} from '@angular/common/http';  
//import 'rxjs/Rx';
//import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class SharedService {
  GetUrl="http://localhost/TaskManagerV3/GetAlltasks";
  AddUrl="http://localhost/TaskManagerV3/AddTask";
  EditUrl="http://localhost/TaskManagerV3/UpdateTask";
 // EditUrl="http://localhost:33274/UpdateTask";
  //http://localhost:33274/
  GetTaskUrl="http://localhost/TaskManagerV3/GetTasksById";
  DelTaskUrl="http://localhost/TaskManagerV3/DeleteTask";
  GetTaskByProjectUrl="http://localhost/TaskManagerV3/GetTasksByProject";
  
  
//final 
GetUserUrl="http://localhost/TaskManagerV3/GetAllUsers";
AddUserUrl="http://localhost/TaskManagerV3/AddUser";
EditUserUrl="http://localhost/TaskManagerV3/UpdateUser";
GetUserbyIdUrl="http://localhost/TaskManagerV3/GetUsersById";
DelUserUrl="http://localhost/TaskManagerV3/DeleteUser";
  

//final Project
GetProjectUrl="http://localhost/TaskManagerV3/GetAllProjects";
AddProjectUrl="http://localhost/TaskManagerV3/AddProject";
EditProjectUrl="http://localhost/TaskManagerV3/UpdateProject";
//EditProjectUrl="http://localhost:33274/UpdateProject";
//EditUrl="http://localhost:33274/UpdateTa
GetProjectbyIdUrl="http://localhost/TaskManagerV3/GetProjectsById";
DelProjectUrl="http://localhost/TaskManagerV3/DeleteProject";
  
  constructor(private _http: Http) { }
    Greet(name:string):string{
        return 'Hello'+ name;
    
    }
    GetAll():Observable<any>
    {
        return this._http.get(this.GetUrl).pipe(
        map(response => response.json() ))
        .catch((error)=>
        {
               return Observable.throw(error);
        })
    }
   
    //final
    GetAllUsers():Observable<any>
    {
        return this._http.get(this.GetUserUrl).pipe(
        map(response => response.json() ))
        .catch((error)=>
        {
               return Observable.throw(error);
        })
    }
    AddUsers(user:User):Observable<any>
    {
        const headers = new HttpHeaders().set('content-type', 'application/json');  
      //  console.log('first name'+user.FirstName);
        return this._http.post(this.AddUserUrl,user).pipe(
            map(response => {
             {return <any>response.json() } ;
     }))
     .catch((error)=>
     {
            return Observable.throw(error);
     })
    }

   
    EditUser(user:User):Observable<any>
    {
         
          const headers = new HttpHeaders().set('content-type', 'application/json');  
        return this._http.put(this.EditUserUrl,user).pipe(
        map(response => {
            { return <any>response.json() };
        }))


    }

    SearchUser(taskid:number):Observable<Task>
    {
        return this._http.get(this.GetUrl+"/"+taskid).pipe(
        map(response => {
            { return <Task>response.json() };
        }))
        .catch((error)=>
        {
               return Observable.throw(error);
        })

    }

    //final

    GetAllProjects():Observable<any>
    {
        console.log('Project id ');
        
        return this._http.get(this.GetProjectUrl).pipe(
        map(response => response.json() ))
        .catch((error)=>
        {
               return Observable.throw(error);
        })

        
    }
    AddProjects(Project:Project):Observable<any>
    {
        const headers = new HttpHeaders().set('content-type', 'application/json');  
      //  console.log('first name'+Project.FirstName);
        return this._http.post(this.AddProjectUrl,Project)
        .pipe(
            map(response => {
             {return <any>response.json() } ;
     }))
     .catch((error)=>
     {
            return Observable.throw(error);
     })
     


    }

    DeleteUser(Userid:number):Observable<any>
    {
             
        return this._http.delete(this.DelUserUrl+"/"+Userid)
         .catch((error)=>
        {
               return Observable.throw(error);
        })
        
    }

         errorHandler(error: Response)
        {
            return Observable.throw(error);
           // console.log('error.messag ' + error.status);
      //  return throwError(error.message || 'Server Error')
        }

    DeleteProject(Projectid:number):Observable<any>
    {
        return this._http.delete(this.DelProjectUrl+"/"+Projectid)
        .pipe(
            map(response => response.json() ))
        .catch((error)=>
        {
               return Observable.throw(error);
        })
              
      }
    EditProject(Project:Project):Observable<any>
    {
         
          const headers = new HttpHeaders().set('content-type', 'application/json');  
        return this._http.put(this.EditProjectUrl,Project)
        .pipe(
        map(response => {
            { return <any>response.json() };
        }))
        .catch((error)=>
        {
               return Observable.throw(error);
        })
        


    }

    SearchProject(taskid:number):Observable<Task>
    {
        return this._http.get(this.GetUrl+"/"+taskid).pipe(
        map(response => {
            { return <Task>response.json() };
        }))
        .catch((error)=>
        {
               return Observable.throw(error);
        })

    }
    
    //final

   
    GetTaskByProjectId(projectid:number):Observable<any>
    {
       // console.log(" my task id" + taskid);
        return this._http.get(this.GetTaskByProjectUrl+"/"+projectid).pipe(
        map(response => response.json() ))
        .catch((error)=>
        {
               return Observable.throw(error);
        })
    }
    GetTaskById(taskid:number):Observable<any>
    {
       // console.log(" my task id" + taskid);
        return this._http.get(this.GetTaskUrl+"/"+taskid).pipe(
        map(response => response.json() ))
        .catch((error)=>
        {
               return Observable.throw(error);
        })
    }
    Add(task:Task):Observable<string>
    {
       
       
        const headers = new HttpHeaders().set('content-type', 'application/json');  
 return this._http.post(this.AddUrl,task).pipe(
         map(response => {
             {return <string>response.json() } ;
            }))
            .catch((error)=>
            {
                   return Observable.throw(error);
            })
           
    }
    Delete(taskid:number):Observable<string>
    {
        return this._http.delete(this.DelTaskUrl+"/"+taskid).pipe(
        map(response => {
            { return <string>response.json() };
        }))
        .catch((error)=>
        {
               return Observable.throw(error);
        })


    }
    Edit(task:Task):Observable<any>
    {
          console.log("edit " + task.TaskName);
          console.log("edit " + task.Startdate);

          const headers = new HttpHeaders().set('content-type', 'application/json');  
        return this._http.put(this.EditUrl,task).pipe(
        map(response => {
            { return <string>response.json() };
        }))
        .catch((error)=>
        {
               return Observable.throw(error);
        })


    }
    Search(taskid:number):Observable<Task>
    {
        return this._http.get(this.GetUrl+"/"+taskid).pipe(
        map(response => {
            { return <Task>response.json() };
        }))

    }

    findWeather(city, state) {
        //this.totReqsMade = this.totReqsMade + 1;
        return this._http.get(this.GetUrl).pipe(
            map(response => {
                { return response.json() };
            }))
           // .catch(error => Observable.throw(error.json()));
    
    }
}
