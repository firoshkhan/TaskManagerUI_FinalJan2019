import { Component, OnInit,Input } from '@angular/core';
import { Project } from '../../models/project';
import {Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { iif } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

import { OrderPipe } from 'ngx-order-pipe';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as $ from 'jquery';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user';
import { VALID } from '@angular/forms/src/model';
import { FormBuilder,FormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],

})

export class ProjectComponent implements OnInit {
  closeResult: string;
  project:Project[];
  Item:Project;
  user:User[];
  useritem:User;
  selected:string;
  msg:string;
  btnAddCaption:string;
  ProjectId:number;
  order: string ;
  date: Date;
  SelectedProjectMgr:string;
  Startdate:Date;
  Enddate:Date;
   ProjMgrId:number;
   ProjMgrFirstandLastName:string;
  error:any={isError:false,errorMessage:''};
  ProjectFilter: any = { ProjectName: '' };
  userFilter: any = { FirstName: '' };
  private datePipe: DatePipe;
  constructor(private _service:SharedService, private orderPipe: OrderPipe,
    private _router: Router,private modalService: NgbModal) { }
 

   ngOnInit() {
      this.Item=new Project();
      this._service.GetAllProjects()
    //  .subscribe(i=>{this.project=i;
    //  });   
      .subscribe(i=>{this.project=i},(err) => {this.msg =err._body});
      this.btnAddCaption="Add";
      this.order='ProjectName';
      this.Item.Priority=0;
      this.selected=null;
  }

 //model window
  open(content) {
    
    this.useritem=new User();
    this._service.GetAllUsers()
  // .subscribe(i=>{this.user=i;
     //   });
        .subscribe(i=>{this.user=i},(err) => {this.msg =err._body}); 
      
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.SelectedProjectMgr = ` ${result}`;
    var arr=this.SelectedProjectMgr.split(","); 
    this.ProjMgrId= parseInt(arr[0]);
    this.Item.ProjectManagerid  =   this.ProjMgrId   
    this.ProjMgrFirstandLastName=  arr[1];
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
onSubmit()
{
 // console.log('submitted');
  this.AddOrUpdate();
}
AddOrUpdate() 
  {
     
    if (this.btnAddCaption=="Update")
      {
        this.msg="Updating .....Please wait";
        if (this.ProjMgrId != null)
        {this.Item.ProjectManager.UserId =   this.ProjMgrId;}        
        this._service.EditProject(this.Item)
        .subscribe(i=>{this.project=i},(err) => {this.msg =err._body}); 
        this.msg="Project Updated sucessfully";      
      //  this.btnAddCaption="Add";
      }
    else //add
      {
        this.msg="Updating .....Please wait";
          this.Item.ProjectManagerid =this.ProjMgrId;
          this._service.AddProjects(this.Item)
        //  .subscribe(i=>this.project=i); 

          .subscribe(i=>{this.project=i},(err) => {this.msg =err._body}); 
          this.msg="Project added sucessfully"; 
          
        }
    //this.Reset();
  }
  ViewProject( Project:Project)
   {
    this.Item.ProjectId=Project.ProjectId;
    this.Item.ProjectName=Project.ProjectName;
    this.Item.Startdate=Project.Startdate;
    this.Item.Enddate=Project.Enddate;
    this.Item.Priority=Project.Priority;
  
    this.Item.ProjectManager=Project.ProjectManager;
     if (Project.ProjectManager != null)
     {
        this.Item.ProjectManagerid =Project.ProjectManager.UserId;
        this.ProjMgrFirstandLastName=Project.ProjectManager.FirstName + " " + Project.ProjectManager.LastName;
     }
    this.btnAddCaption="Update";
    
   }

   fetchData()
   {
 
    this.Item=new Project();
    this._service.GetAllProjects()
    .subscribe(i=>{this.project=i;
        });
   }

   Delete(Project:Project,index)
   {
    this.msg="Deleting.....Please wait";
    this._service.DeleteProject(Project.ProjectId).subscribe(()=>{
         this.fetchData();
        }  );
        this.msg="Project Deleted sucessfully!";
    }
   Reset()
   {  
    this.btnAddCaption="Add";
    this.Item.ProjectName="";
    this.Item.Startdate=null;
    this.Item.Enddate=null;
    this.Item.Priority=null;
    this.ProjMgrFirstandLastName="";
    this.ProjMgrId=null;
    $("#checkDates").prop("checked",false);
    this.msg=""; 
   }

   Sort(orderby:string)
   {
    this.order=orderby;
   }

   SetDate(values:any){
      if (values.currentTarget.checked)
      {
          this.Item.Startdate=new Date();
          this.Enddate = new Date();
          this.Enddate.setDate( this.Enddate.getDate() + 1 );
          this.Item.Enddate=this.Enddate;
      }
      else
      {  
            this.Item.Startdate=null;
            this.Item.Enddate=null;
      }
    }

   

   compareTwoDates(){
    // console.log(" this.Item.Enddate" + this.Item.Enddate);
     this.Startdate=this.Item.Startdate;
     this.Enddate=this.Item.Enddate;
   
     }
}
