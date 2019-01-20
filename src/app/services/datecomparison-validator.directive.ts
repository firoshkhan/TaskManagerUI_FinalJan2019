import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS,FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DatepickerViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
@Directive({
    selector: '[CompareDates]',
    providers: [
        { provide: NG_VALIDATORS, 
            useExisting:forwardRef(() => DateComparisonValidator),
             multi: true }
    ]
})
export class DateComparisonValidator implements Validator 
{
   // constructor( @Attribute('CompareDates') 
   // public CompareDates: string) {}

    @Input() CompareDates: string;

    validate(c: AbstractControl):
 //  validate(form: FormGroup):
     { [key: string]: any } 
     
     {
  
      console.log(" called" );
        let controltocompare=c.root.get(this.CompareDates);
       
          if (controltocompare != null && c != null)
           {  
             let SDate:any;
             let EDate:any;

             controltocompare.setErrors(null);
             c.setErrors(null);

       
             if  (this.CompareDates=="StartDate") {
               SDate = moment(controltocompare.value);
               EDate = moment(c.value);  
             }
             else{ // enddate
              SDate = moment(c.value);
              EDate =   moment(controltocompare.value);
             }

              if(SDate> EDate)
                {
                  console.log(" trur" ); 
                  return {'DatesInvalid':true};   
                         
                }
                else
                {
                  console.log(" null" ); 
                  return null;  
                }
            }
            
      return null;     
     
    }
}