import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AddComponent } from './ui/add/add.component';
import { UpdateComponent } from './ui/update/update.component';
import { ViewComponent } from './ui/view/view.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
//import {HttpClient} from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { UserComponent } from './ui/user/user.component';
//final
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ProjectComponent } from './ui/project/project.component';

import { NgbdModalComponent } from './ui/modal/modal.component';
import { NgbdModalContent } from './ui/modal/modal.component';
//import { NgbdModalContent } from './ui/project/project.component';
import { DateComparisonValidator } from './services/datecomparison-validator.directive';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//import { ModalDialogModule } from 'ngx-modal-dialog';
//import { AlertsModule } from 'angular-alert-module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './ui/modal1/modal1.component';
//import { NgbdModalBasic1 } from './ui/project/project.component';
//import { ModalComponentComponent } from './ui/modal-component/modal-component.component';
//import { ModalComponent } from './ui/modal/modal.component';
//import { NotifierModule } from 'angular-notifier';
const appRoutes: Routes=[
   { path: 'add', component:AddComponent},
   { path: 'view', component:ViewComponent},
   { path: 'user', component:UserComponent},
   { path: 'project', component:ProjectComponent},
   { path: 'modal', component:NgbdModalComponent},
   { path: 'modal1', component:NgbdModalBasic},
   { path: 'update/:id', component:UpdateComponent},
   { path: 'add/:id', component:AddComponent},
   { path: 'add/:id/:mode', component:AddComponent}
  ] 

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    UpdateComponent,
    ViewComponent,
    FilterPipe,

    UserComponent,

    ProjectComponent ,
    NgbdModalContent,
    NgbdModalComponent,
    NgbdModalBasic,
    DateComparisonValidator
    //,    NotifierModule
    
   
    //,    NgbdModalBasic1
    //Modal1Component
    
  
    
  ],
  entryComponents: [NgbdModalContent],
  imports: [
    BrowserModule,FormsModule,HttpModule, RouterModule.forRoot(appRoutes),
    HttpClientModule   ,
    //final
    OrderModule,
    FilterPipeModule
    ,
  //  HttpClient,
    NgbModule,
    FormsModule,
    //NotifierModule
 
    //,    AlertsModule.forRoot()
   //
   // ,    OwlDateTimeModule, 
    //     OwlNativeDateTimeModule,


  ],
  providers: [SharedService],
  bootstrap: [AppComponent],


})
export class AppModule { }
