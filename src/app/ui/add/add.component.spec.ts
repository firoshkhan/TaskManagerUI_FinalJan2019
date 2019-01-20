import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../../models/task';
import { NgModule }           from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule,FormsModule],
      declarations: [ AddComponent ]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be added', () => {
    let t:Task;
    t={TaskId:1,TaskName:"ff56",TaskParent:null,TaskParentId:null,Priority:11,Startdate:null,Enddate:null}
    component.Item=t
    component.Add()
    expect(component.msg).toEqual('Task Added Sucessfully')
  });
});
