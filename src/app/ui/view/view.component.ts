import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
import {debounceTime} from 'rxjs/operators';


import { OrderPipe } from 'ngx-order-pipe';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../models/project';
//import { AlertsService } from 'angular-alert-module';
//import { NotifierService } from 'angular-notifier';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  
})
export class ViewComponent implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;
  
  task:Task[];
  subtask:Task[];
  msg:string;
  Item:Task;
  /*
   FilterTask:Task[];
  FilterApplied:boolean;
  FilterTaskName:string;
  public FilterParentTask:string;
  FilterPriorityFrom:number;
  FilterPriorityTo:number;
  FilterStartDate:Date;
  FilterEndDate:string;*/
  order: string ;
  project:Project[];
  projectitem:Project;
  SelectedProject:string;
  closeResult: string;
  ProjectId:number;
  ProjectName:string;
  projectFilter: any = { ProjectName: '' };
  private datePipe: DatePipe;
  //private readonly notifier: NotifierService;
  constructor(private _service:SharedService,
  private orderPipe: OrderPipe,
  private modalService: NgbModal ,
  alertConfig: NgbAlertConfig,
 // private notifierService: NotifierService,
    private _router: Router
    //,    private alerts: AlertsService
  ) {    
   // this.notifier = notifierService;
   alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }

   //model window project
    openproject(projectcontent) {

    
      this.projectitem=new Project();
      this._service.GetAllProjects()
      .subscribe(i=>{this.project=i;
          });
  
      this.modalService.open(projectcontent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.SelectedProject = ` ${result}`;
     // this.SelectedProjectMgr = '${result}';
     var arr=this.SelectedProject.split(",");   
     console.log('Proj id arr '+arr[0]);
     this.ProjectId= parseInt(arr[0]);
     console.log('Proj name id 1 '+this.ProjectId);
     this.ProjectName=  arr[1];

        this._service.GetTaskByProjectId(this.ProjectId)
    .subscribe(i=>{this.task=i; 
        });
       // console.log('task '+this.task.length);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  
   Edit( task:Task)
   {
     this._router.navigate(['add', task.TaskId]);
      
   }
   EndTask( task:Task)
   {
console.log("FilterTaskName" );
    task.Enddate=new Date();
    task.Status="Completed";
  
    console.log("tt" +  task.TaskName);
    this._service.Edit (task)
    .subscribe(i=>this.msg=i); 
   // this.notifier.notify( 'success', 'You are awesome! I mean it!' );
   // this.alerts.setConfig('warn','icon','warning');
 //   this.alerts.setMessage('Task Ended successfully!','success');
 this._success.next(`Task Ended successfully!`);
     this._service.GetAll()
     .subscribe(i=>{this.task=i; 
         });
   }
   Sort(orderby:string)

   {
    this.order=orderby;
   }
   Delete( task:Task,index)
   {

    this._service.Delete(task.TaskId).subscribe(()=>{
      this.task.splice(index, 1);
  });
    

   // this._service.GetAll()
  //  .subscribe(i=>{this.task=i; 
    //    });
   }

   /*
   Search()
   {
    this.FilterApplied=false;
   // console.log(this.subtask.length);
    if (this.FilterTask==undefined) {     
      this.FilterTask = Object.assign([], this.task);    
      ///console.log("FilterTask" + this.task.length);
    }
    this.task = Object.assign([], this.FilterTask); 
    
    if (this.FilterTaskName.trim()!="")
    {
      //console.log("FilterTaskName" + this.FilterTaskName);
     // this.FilterApplied=true;
      this.task=this.task.filter(i=>i.TaskName.toUpperCase()
       .startsWith(this.FilterTaskName.toUpperCase() ) );

       //console.log("length in FilterTaskName" + this.task.length);
    } 
    if (this.FilterParentTask.trim()!="")
    {
      console.log("FilterTaskName1"  );
      console.log("FilterTaskName" + this.task[5].TaskParent["TaskName"] );
     // this.FilterApplied=true;
    
     this.task=this.task.filter(i=>   i.TaskParent !=null);
      this.task=this.task.filter(i=>  
         
                  i.TaskParent.TaskName.toUpperCase()
                  .startsWith(this.FilterParentTask.toUpperCase() )
            
           
    );
      
    } 
    if ( this.FilterPriorityFrom!=null && this.FilterPriorityFrom.toString().length >0 )
      {

       
               {
        //  console.log("FilterPriorityFrom" + this.FilterPriorityFrom.valueOf() + "ttt");
          // this.FilterApplied=true;
          this.task=this.task.filter(i=> i.Priority.valueOf() >= this.FilterPriorityFrom );
         // console.log("length in FilterPriorityFrom" + this.task.length);
      } 
    }
    if ( this.FilterPriorityTo!=null && this.FilterPriorityTo.toString().length >0 )
    {
     // console.log("FilterPriorityFrom" + this.FilterPriorityFrom);
     // this.FilterApplied=true;
    this.task=this.task.filter(i=>i.Priority.valueOf() <= this.FilterPriorityTo );
   // console.log("length in FilterPriorityTo" + this.task.length);
    } 
    if (this.FilterStartDate!=null && this.FilterStartDate.toString().length >0 )
    { 
     // console.log("length in FilterPriorityTo" + this.FilterStartDate);
      const start = new Date(this.FilterStartDate);     
        this.task=this.task.filter(i=>new Date(i.Startdate).getMonth()==start.getMonth()      
        && new Date(i.Startdate).getDate()==start.getDate() 
        && new Date(i.Startdate).getFullYear()==start.getFullYear() 
        );       
    }  
    if (this.FilterEndDate!=null && this.FilterEndDate.toString().length >0 )
    {
      const end = new Date(this.FilterEndDate);     
      this.task=this.task.filter(i=>new Date(i.Enddate).getMonth()==end.getMonth()      
      && new Date(i.Enddate).getDate()==end.getDate() 
      && new Date(i.Enddate).getFullYear()==end.getFullYear() 
      );  
    }  
    
  
   // console.log(" firosh " + this.task[5].Taskparent.TaskId  );
  
   }

*/
  ngOnInit() {
    this.Item=new Task();

  

    this._service.GetAll()
    .subscribe(i=>{this.task=i; 
       });
        this.order='TaskName';
       /* this.FilterTaskName="";
    this.FilterParentTask="";
    this.FilterPriorityFrom=null;
    this.FilterPriorityTo=null;
    this.FilterStartDate=null;
    this.FilterEndDate=null;*/


    setTimeout(() => this.staticAlertClosed = true, 10000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(1000)
    ).subscribe(() => this.successMessage = null);

  }

  
  

}
