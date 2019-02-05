import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { iif } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:User[];
  Item:User;
  msg:string;
  btnAddCaption:string;
  UserId:number;
  order: string ;
  userFilter: any = { FirstName: '' };
  public errorMsg;
  error: Response;
  /*task:Task[];
  subtask:Task[];
  FilterTask:Task[];
  Item:Task;
  FilterApplied:boolean;
  FilterTaskName:string;
  public FilterParentTask:string;
  FilterPriorityFrom:number;
  FilterPriorityTo:number;
  FilterStartDate:Date;
  FilterEndDate:string;*/
  private datePipe: DatePipe
  constructor(private _service:SharedService, private orderPipe: OrderPipe,
    private _router: Router) { }

   ngOnInit() {
    this.Item=new User();
    this._service.GetAllUsers()
    .subscribe(i=>{this.user=i},(err) => {this.msg =err._body});    
   this.btnAddCaption="Add";
   this.order='FirstName';
  }

  onSubmit()
   {  
      this.AddOrUpdate();   
   }

  AddOrUpdate() 
  {
    
      console.log('btnAddCaption  '+this.btnAddCaption);
    if (this.btnAddCaption=="Update")
      {
       
        this.Item.UserId=this.UserId;     
        this._service.EditUser(this.Item)
        .subscribe(i=>{this.user=i},(err) => {this.msg =err._body}); 
        this.msg="User updated  sucessfully !"
      //  this.Reset();
       // this.btnAddCaption="Add";
      }

    else
      {      
        this._service.AddUsers(this.Item)
        .subscribe(i=>{this.user=i},(err) => {this.msg =err._body}); 
        this.msg="New User Added Sucessfully !"    
      }
    
  }
  fetchData()
  {

    this.Item=new User();
    this._service.GetAllUsers()
    .subscribe(i=>{this.user=i; 
        },(err) => {this.msg =err._body});
  }
  ViewUser( User:User)
   {

    this.Item.FirstName=User.FirstName;
    this.Item.LastName=User.LastName;
    this.Item.EmpId=User.EmpId;
    this.UserId=User.UserId;
    this.btnAddCaption="Update";
 
   }

   Delete(User:User,index)
   {
   
    this._service.DeleteUser(User.UserId).subscribe
    (()=>{this.fetchData()}, (err) => {this.msg =err._body}
  
    
    );
          
      
      }
   Reset()
   {  
    this.msg="";
    this.btnAddCaption="Add";
    /*this.Item.ProjectName="";
    this.Item.Startdate=null;
    this.Item.Enddate=null;
    this.Item.Priority=null;
    this.ProjMgrFirstandLastName="";
    this.ProjMgrId=null;
    $("#checkDates").prop("checked",false);
    this.msg=""; */
   }

   Sort(orderby:string)
   {
    this.order=orderby;
   }

   
}
