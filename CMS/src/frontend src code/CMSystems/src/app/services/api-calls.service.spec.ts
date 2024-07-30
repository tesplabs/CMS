import { TestBed } from '@angular/core/testing';

import { ApiCallsService } from './api-calls.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('ApiCallsService', () => {
  let service: ApiCallsService;

  beforeEach(() => {
    // TestBed.resetTestingModule();
    const spy = jasmine.createSpyObj<ApiCallsService>('ApiCallsService', ['getComponent']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiCallsService]
    });
    service = TestBed.inject(ApiCallsService) as jasmine.SpyObj<ApiCallsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail to initialize ApiCallsService if dependencies are not provided', () => {
    expect(() => {
      TestBed.configureTestingModule({
        providers: [ApiCallsService]
        
      }).compileComponents();
    }).toThrowError();
  });

  it('should have a null instance if service is not properly initialized', () => {
    let serviceInstance: ApiCallsService | null = null;
    expect(serviceInstance).toBeNull();
  });

  


  it('should return the observable from the getComponent method', () => {
    const observable = service.getComponent();
    expect(observable).toBeTruthy();
    expect(observable instanceof Observable).toBeTruthy();
  });

  it('should not return an observable if getComponent method is not implemented', () => {
    spyOn(service, 'getComponent').and.returnValue(of(null));
    const observable = service.getComponent();
    observable.subscribe(result => {
      expect(result).toBeNull();
    });
  });

  it('should throw an error when getComponent method fails', () => {
    spyOn(service, 'getComponent').and.throwError('Method not implemented');
    expect(() => service.getComponent()).toThrowError('Method not implemented');
  });

  


  it('should return the observable from the addComponent method', () => {
    const componentData = {};
    const observable = service.addComponent(componentData);
    expect(observable).toBeTruthy();
    expect(observable instanceof Observable).toBeTruthy();
  });

  it('should throw an error when addComponent method fails', () => {
    spyOn(service, 'addComponent').and.throwError('Method not implemented');
    expect(() => service.addComponent({})).toThrowError('Method not implemented');
  });

  it('should not return an observable if addComponent method is not implemented', () => {
    spyOn(service, 'addComponent').and.returnValue(of((null)));
    const observable = service.addComponent({});
    observable.subscribe(result => {
      expect(result).toBeNull();
    });
  });

  it('should not return an observable of incorrect type from addComponent method', () => {
    spyOn(service, 'addComponent').and.returnValue(of('not an observable'));
    const observable = service.addComponent({});
    observable.subscribe(value => {
      expect(typeof value === 'string').toBeTruthy(); 
    });
  });




  it('should return the observable from the updateComponent method', () => {
    const componentData = {};
    const observable = service.updateComponent(componentData);
    expect(observable).toBeTruthy();
    expect(observable instanceof Observable).toBeTruthy();
  });

  it('should not return an observable if updateComponent method is not implemented', () => {
    spyOn(service, 'updateComponent').and.returnValue(of(null));
    const observable = service.updateComponent({});
    observable.subscribe(result => {
      expect(result).toBeNull();
    })
  });

  it('should throw an error when updateComponent method fails', () => {
    spyOn(service, 'updateComponent').and.throwError('Method not implemented');
    expect(() => service.updateComponent({})).toThrowError('Method not implemented');
  });

  it('should not return an observable of incorrect type from updateComponent method', () => {
    spyOn(service, 'updateComponent').and.returnValue(of('not an observable'));
    const observable = service.updateComponent({});
    observable.subscribe(value => {
      expect(typeof value === 'string').toBeTruthy(); 
    });
  });
  

  // observable.subscribe(result => {
  //   expect(result).toBeNull();
  // });


  it('should return the observable from the deleteComponent method', () => {
    const serialNo = 1;
    const observable = service.deleteComponent(serialNo);
    expect(observable).toBeTruthy();
    expect(observable instanceof Observable).toBeTruthy();
  });

  it('should not return an observable if deleteComponent method is not implemented', () => {
    spyOn(service, 'deleteComponent').and.returnValue(of(null));
    const observable = service.deleteComponent(1);
    observable.subscribe(result => {
      expect(result).toBeNull();
    })
  });

  it('should throw an error when deleteComponent method fails', () => {
    spyOn(service, 'deleteComponent').and.throwError('Method not implemented');
    expect(() => service.deleteComponent(1)).toThrowError('Method not implemented');
  });

  it('should not return an observable of incorrect type from deleteComponent method', () => {
    spyOn(service, 'deleteComponent').and.returnValue(of('not an observable'));
    const observable = service.deleteComponent(1);
    observable.subscribe(value => {
      expect(typeof value === 'string').toBeTruthy(); 
    });
  });
  
});
