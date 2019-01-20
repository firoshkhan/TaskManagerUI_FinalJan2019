import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import * as $ from 'jquery';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { iif } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { VALID } from '@angular/forms/src/model';
import { FormBuilder,FormsModule, FormGroup, Validators } from '@angular/forms';
//import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
Item:Task;
msg:string;
task:Task[];

user:User[];
project:Project[];
parentTask:Task[];

useritem:User;
projectitem:Project;
closeResult: string;
TaskId:string;
UserId:number;
UserFirstandLastName:string;
SelectedUser:string;
SelectedProject:string;
SelectedTask:string;
ProjectId:number;
ProjectName:string;
btnAddCaption:string;
Startdate:Date;
Enddate:Date;

error:any={isError:false,errorMessage:''};
IsParenttask:boolean;
ParentTaskId:number;
ParentTaskName:string;
projectFilter: any = { ProjectName: '' };
userFilter: any = { FirstName: '' };
parentTaskFilter: any = { TaskName: '' };
private datePipe: DatePipe;


 constructor(private _service:SharedService,
  private orderPipe: OrderPipe,
  private activatedRoute: ActivatedRoute,
 
  private _router: Router,private modalService: NgbModal) {
    this.Item=new Task();
    this.TaskId= this.activatedRoute.snapshot.paramMap.get('id');
  //  console.log(" task id" + this.TaskId );

  }

  
  //model window user
  openuser(usercontent) {
    this.useritem=new User();
    this._service.GetAllUsers()
    .subscribe(i=>{this.user=i;
        });
            this.modalService.open(usercontent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.SelectedUser = ` ${result}`; 
            var arr=this.SelectedUser.split(",");  
            this.UserId= parseInt(arr[0]);
            this.UserFirstandLastName=  arr[1];
      }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

    //model window project
    openproject(projectcontent) {
      this.projectitem=new Project();
      this._service.GetAllProjects()
          .subscribe(i=>{this.project=i; });
           this.modalService.open(projectcontent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.SelectedProject = ` ${result}`;   
          var arr=this.SelectedProject.split(",");    
          this.ProjectId= parseInt(arr[0]);
          this.ProjectName=  arr[1];  
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
       //model window parentTask
  openParentTask(ParentTaskcontent) {
    this._service.GetAll()
    .subscribe(i=>{this.parentTask=i;   });

      this.modalService.open(ParentTaskcontent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.SelectedTask = ` ${result}`;
      var arr=this.SelectedTask.split(",");   
      this.ParentTaskId= parseInt(arr[0]);
      this.ParentTaskName=  arr[1];

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
//model window

  ngOnInit() {
      //Disable pop window button
        $(document).ready(function(){
          $('input[type="checkbox"]').click(function(){
              if($(this).prop("checked") == true){
                    $("#userParentTask").addClass("disabled");
                    $("#userSearch").addClass("disabled");
              }
              else if($(this).prop("checked") == false){
                      $("#userParentTask").removeClass("disabled");
                  $("#userSearch").removeClass("disabled");
              }
          });
        });

        

        if (this.TaskId != null) //update      
          {
            this.Item=new Task();
            this._service.GetTaskById(parseInt(  this.TaskId))
            .subscribe(i=>
              {this.Item=i; 
             if (this.Item.TaskParent != null)
             {
              this.ParentTaskName=this.Item.TaskParent.TaskName;
              this.ParentTaskId=this.Item.TaskParentId;
             }
             if (this.Item.TaskUser != null)
             {
              this.UserFirstandLastName=this.Item.TaskUser.FirstName + " " + this.Item.TaskUser.LastName; 
              this.UserId=this.Item.TaskUser.UserId;
             }
             if (this.Item.TaskProject != null)
             {
              this.ProjectName=this.Item.TaskProject.ProjectName; 
              this.ProjectId=this.Item.TaskProjectId; 
             }
             
            } );

             if (this.Item.IsParentTask==true)      
              {

              }
          this.DisableForEditTask();         
            this.btnAddCaption="Update";
          }
        else //add
          {   
              this.SetDate()
              this.btnAddCaption="Add";
          }
  }

  DisableForEditTask()
  {
        //disable user and project pop up 
        $("#userSearch").addClass("disabled");
        $("#projSearch").addClass("disabled");
        
        $('form input[type="checkbox"]').prop("disabled", true);
  }
  //Parent Task checkbox checked
  IsParentTask(values:any){
    if (values.currentTarget.checked)
    { 
      this.Item.TaskProjectId =null;
      this.Item.TaskUserId =null;//this.date.setDate(  new Date() + 3 );
      this.Item.Priority=null;
      this.Item.Startdate =null;
      this.Item.Enddate =null;
      this.UserFirstandLastName="";
      this.ParentTaskName="";
    }
    else
    {  
      this.SetDate();
    }
    
  }
  //Set default  start and end date
  SetDate()
  {
    
    this.Item=new Task();
    this.Item.Startdate=new Date();
    this.Enddate = new Date();
    this.Enddate.setDate( this.Enddate.getDate() + 1 );
    this.Item.Enddate=this.Enddate;   
    this.ngOnInit;
  }
  //Add Task
   AddOrUpdate() 
  {

    //console.log("firosj");
    if (this.btnAddCaption=="Update")
      {
        
    //console.log("update");
        //this.Item.ProjectManager.UserId =   this.ProjMgrId
        this.Item.TaskParentId =this.ParentTaskId;
        this.Item.TaskProjectId =this.ProjectId;
        this.Item.TaskUserId =this.UserId;
     
        this._service.Edit (this.Item)
        .subscribe(i=>this.msg=i);    
        this.msg="Task Updated Sucessfully ! ";      
       // this.btnAddCaption="Add";
      }
    else //add
      {
    //    console.log("add");
     //   console.log(" task id" + this.TaskId );
        this.Item.TaskParentId =this.ParentTaskId;
        this.Item.TaskProjectId =this.ProjectId;
        this.Item.TaskUserId =this.UserId;

        this.Item.Enddate=this.Enddate;
        this.Item.Startdate=this.Startdate;

        console.log(" task id" + this.TaskId );
        this._service.Add(this.Item)
        
        .subscribe(i=>this.msg=i); 
       
        this.msg="Task Added Sucessfully ! "; 
        }
    
  }

  Reset()
   {  
     
   // console.log("reset" );
   // this.btnAddCaption="Add";
    this.Item.TaskName="";
  //  this.Item.Startdate=null;
    //this.Item.Enddate=null;
    this.Item.Priority=1;
    
    this.UserId=null;
    this.UserFirstandLastName=  "";
    this.ProjectId=null;
    this.ProjectName=   "";
    this.ParentTaskId=null;
    this.ParentTaskName=   "";

  
    this.SetDate();
  
   }
  onSubmit()
  {

    this.AddOrUpdate();
  }
  //Date validation
  compareTwoDates(){
   // console.log(" this.Item.Enddate" + this.Item.Enddate);
    this.Startdate=this.Item.Startdate;
    this.Enddate=this.Item.Enddate;
  //  let SDate = moment(this.Item.Startdate);
    //let EDate = moment(this.Item.Enddate);
    /*
        if(SDate> EDate)    {    
            this.error={isError:true,errorMessage:'Start date should be less than End date'};
        } else{
          this.error="";
        }
        */
    }
}
