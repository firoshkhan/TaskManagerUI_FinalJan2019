import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';
//import {Router1} from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers:[DatePipe]
 
})
export class UpdateComponent implements OnInit
 {
  Item:Task;
  TaskId:string;
  task:Task[];
  msg:string;
  _router:Router;
  constructor(private _service:SharedService, private activatedRoute: ActivatedRoute,
   
    private datePipe: DatePipe)
   {
    this.TaskId= this.activatedRoute.snapshot.paramMap.get('id');
      console.log(" task id" + this.TaskId );
     } 
 
 
  Update()
  {

    this._service.Edit (this.Item)
    .subscribe(i=>this.msg=i);
 
    console.log(this.msg);
  } 
  
  ngOnInit()
   {
    this.Item=new Task();
       this._service.GetTaskById(parseInt(  this.TaskId))
    .subscribe(i=>{this.Item=i; 
        } );
        
        this._service.GetAll()
        .subscribe(i=>{this.task=i;    });   
  }




}
