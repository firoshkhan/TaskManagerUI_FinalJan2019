import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SharedService]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  })); 

  it('should be added', inject([SharedService], (service: SharedService) => {
    const cnt=service.GetAll.length
    console.log('dd' + cnt)
    expect(cnt).toBeGreaterThan(-1)
  })); 
  
  it('should be Hello Sachin', inject([SharedService], (service: SharedService) => {
    const msg=service.Greet('Sachin')
    expect(msg).toEqual('HelloSachin')
  })); 

});
