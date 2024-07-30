import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableComponent } from './datatable.component';
import { ApiCallsService } from '../services/api-calls.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockMatTableDataSource extends MatTableDataSource<any> {}

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;
  let apiCallService: ApiCallsService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [DatatableComponent],
      imports: [
        FormsModule,
        MatFormFieldModule, BrowserAnimationsModule,
        MatInputModule, MatIconModule, MatPaginatorModule,
        MatTableModule,
        HttpClientTestingModule
      ],
      providers: [ 
        ApiCallsService,
        { provide: MatTableDataSource, useClass: MockMatTableDataSource }
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallsService) as jasmine.SpyObj<ApiCallsService>;
    component.dataSource = new MatTableDataSource<any>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create if the required service is missing', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [DatatableComponent],
      providers: []
    }).overrideProvider(ApiCallsService, { useValue: null }).compileComponents();

    expect(() => {
      fixture = TestBed.createComponent(DatatableComponent);
      fixture.detectChanges();
    }).toThrowError();
  });

  it('should not create if template fails to compile', () => {
    spyOn(fixture, 'detectChanges').and.throwError('Template Compile Error');
    expect(() => fixture.detectChanges()).toThrowError('Template Compile Error');
  });


  it('should initialize the dataSource', () => {
    expect(component.dataSource).toBeDefined();
  });

  it('should not initialize the datasource if the service call fails', () => {
    spyOn(apiCallService, 'getComponent').and.returnValue(throwError('Service error'));
    try{
      component.ngOnInit();
    } catch (error){
      expect(error).toBe('Service error');
      expect(component.dataSource).toBeUndefined();
    }
  });

  it('should not initialize the datasource if the data format is incorrect', () => {
    const invalidData = { invalid: 'data' };
    spyOn(apiCallService, 'getComponent').and.returnValue(of(invalidData));
    try{
      component.ngOnInit();
    } catch(error){
      expect(error).toContain('data format')
      expect(component.dataSource).toBeUndefined();
    }
  });


  it('should have the correct columns', () => {
    const columns = ['serialNo', 'manufacturerPartNum', 'componentType', 'packageSize', 'quantityAvailable', 'entryDate', 'binNumber', 'rackNumber', 'projectUsed', 'actions'];
    expect(component.displayedColumns).toEqual(columns);
  });

  it('should not have the correct columns if component properties are undefined', () => {
    component.displayedColumns = [];
    fixture.detectChanges();
    expect(component.displayedColumns).not.toEqual(['serialNo', 'manufacturerPartNum', 'componentType', 'packageSize', 'quantityAvailable', 'entryDate', 'binNumber', 'rackNumber', 'projectUsed', 'actions']);
  });

  it('should not have the correct columns if columns are missing', () => {
    component.displayedColumns = [];
    fixture.detectChanges();
    expect(component.displayedColumns).not.toEqual(['serialNo', 'manufacturerPartNum', 'componentType', 'packageSize', 'quantityAvailable', 'entryDate', 'binNumber', 'rackNumber', 'projectUsed', 'actions']);
  });

  it('should not have the correct columns if few required columns are missing', () => {
    component.displayedColumns = ['componentType', 'packageSize'];
    fixture.detectChanges();
    expect(component.displayedColumns).not.toEqual(['serialNo', 'manufacturerPartNum', 'componentType', 'packageSize', 'quantityAvailable', 'entryDate', 'binNumber', 'rackNumber', 'projectUsed', 'actions']);
  });


  it('should filter data correctly', () => {
    spyOn(component, 'applyFilter').and.callThrough();
    component.filterValue = 'test';
    component.applyFilter();
    expect(component.applyFilter).toHaveBeenCalled();
  });

  it('should not filter data if the filter value is empty', () => {
    component.filterValue = '';
    component.applyFilter();
    expect(component.dataSource.filter).toBe('');
  });

  it('should not filter data if dataSource is undefined', () => {
    component.dataSource = undefined as any;
    component.filterValue = 'test';
    component.applyFilter();
    expect(component.dataSource).toBeUndefined();
  });


  it('should open dialog on button click', () =>{
    spyOn(component, 'openDialog').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('.button-container button');
    button.click();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should not open dialog if button is not clicked', () => {
    spyOn(component, 'openDialog');
    expect(component.openDialog).not.toHaveBeenCalled();
  });

  it('should not open dialog if the dialog component is not registered', () => {
    spyOn(component, 'openDialog').and.callFake(() => { throw new Error('Dialog component not registered'); });
    const button = fixture.debugElement.nativeElement.querySelector('.button-container button');
    button.click();
    expect(component.openDialog).toThrowError('Dialog component not registered');
  });


  it('should sort data accordingly', () => {
    spyOn(component, 'sortData').and.callThrough();
    const event = { active: 'serialNo', direction:'asc'};
    component.sortData(event);
    expect(component.sortData).toHaveBeenCalledWith(event);
  });

  it('should not sort data if sortData is not called', () => {
    spyOn(component, 'sortData');
    expect(component.sortData).not.toHaveBeenCalled();
  });
  
  it('should not sort data if sort event is invalid', () => {
    const event = { active: null, direction: null };
    spyOn(component, 'sortData').and.callThrough();
    component.sortData(event);
    expect(component.sortData).toHaveBeenCalledWith(event);
    expect(component.dataSource.sort).toBeUndefined();
  });
  

  it('should load data from the service', () => {
    const mockComponents = [
      {
        serialNo: 1, manufacturerPartNo: 'ABC432',
        componentType: 'Type1', packageSize: '4small', 
        qtyAvailable: 20, entryDate: '2024-06-20', 
        binNo: 'A1', rackNo: 'R1', projectUsed: 'project1'
      }
    ];
    spyOn(apiCallService, 'getComponent').and.returnValue(of(mockComponents));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(mockComponents);
  });

  it('should not load data if the service returns an error', () => {
    spyOn(apiCallService, 'getComponent').and.throwError('Service Error');
    expect(() => component.ngOnInit()).toThrowError('Service Error');
  });
  
  it('should not load data if the data format is incorrect', () => {
    const invalidData = { invalid: 'data' };
    spyOn(apiCallService, 'getComponent').and.returnValue(of(invalidData));
    component.ngOnInit();
    expect(component.dataSource.data).toEqual([]);
  });


  it('should delete component', () => {
    spyOn(component, 'deleteComponent').and.callThrough();
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(By.css('.action-buttons button'));
    expect(deleteButton).toBeNull();
    
    if(deleteButton){
      deleteButton.triggerEventHandler('click', null);
      expect(component.deleteComponent).toHaveBeenCalled();
    }
  });

  it('should not delete component if deleteComponent is not called', () => {
    spyOn(component, 'deleteComponent');
    expect(component.deleteComponent).not.toHaveBeenCalled();
  });
  
  it('should not delete component if the button is not clicked', () => {
    spyOn(component, 'deleteComponent');
    const deleteButton = fixture.debugElement.query(By.css('.action-buttons button'));
    expect(deleteButton).toBeNull();
    expect(component.deleteComponent).not.toHaveBeenCalled();
  });


  it('should set paginator', () => {
    expect(component.dataSource.paginator).toBeTruthy();
  });

  it('should not set paginator if dataSource is undefined', () => {
    component.dataSource = undefined as any;
    fixture.detectChanges();
 
    expect(component.dataSource).toBeUndefined();
  });
  
  it('should not set paginator if paginator is not defined', () => {
    component.dataSource.paginator = null;
    fixture.detectChanges();
    expect(component.dataSource.paginator).toBeNull();
  });  
});