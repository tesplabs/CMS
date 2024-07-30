import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddComponentsComponent } from '../add-components/add-components.component';
import { ApiCallsService } from '../services/api-calls.service';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let dialogRef: MatDialogRef<MainComponent>;
  let httpMock: HttpTestingController;
  let apiCallsService: ApiCallsService;
  let matDialogStub: Partial<MatDialogRef<MainComponent>>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MainComponent, any>>;

  beforeEach(async () => {

    matDialogStub = {
      close: jasmine.createSpy('close') // Creating a spy for the close method
    };
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    dialogRefSpy.close.and.returnValue();

    await TestBed.configureTestingModule({
      declarations: [MainComponent, AddComponentsComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialog, useValue: MatDialog },
      { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    httpMock = TestBed.inject(HttpTestingController);
    apiCallsService = TestBed.inject(ApiCallsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create the component if dependency is missing', () => {
    let errorcomponent : MainComponent | null = null;
    try{
      errorcomponent = getTestBed().inject(MainComponent);
    } catch(error) {
      errorcomponent=null;
    }
    expect(errorcomponent).toBeNull();
  });

  it('should initialize form correctly', () => {
    expect(component.formGroup).toBeDefined();
  });

  it('should set formGroup as invalid if form is not initialized correctly', () => {

    component.formGroup.controls['manufacturerPartNo'].setValue(null);
    component.formGroup.controls['componentType'].setValue(null);
    component.formGroup.controls['packageSize'].setValue(null);
    component.formGroup.controls['qtyAvailable'].setValue(null);
    component.formGroup.controls['entryDate'].setValue(null);
    component.formGroup.controls['binNo'].setValue(null);
    component.formGroup.controls['rackNo'].setValue(null);
    component.formGroup.controls['projectUsed'].setValue(null);

    fixture.detectChanges();

    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should set formGroup as invalid if required fields are empty', () => {
    component.formGroup.controls.manufacturerPartNo.setValue('');
    component.formGroup.controls.componentType.setValue('');
    component.formGroup.controls.packageSize.setValue('');
    component.formGroup.controls.qtyAvailable.setValue('');
    component.formGroup.controls.entryDate.setValue('');
    component.formGroup.controls.binNo.setValue('');
    component.formGroup.controls.rackNo.setValue('');
    component.formGroup.controls.projectUsed.setValue('');

    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should set formgroup as valid if required fields are filled', () => {
    component.formGroup.controls.manufacturerPartNo.setValue('ABC896');
    component.formGroup.controls.componentType.setValue('TYPE');
    component.formGroup.controls.packageSize.setValue('4M');
    component.formGroup.controls.qtyAvailable.setValue('10');
    component.formGroup.controls.entryDate.setValue('2024-06-19');
    component.formGroup.controls.binNo.setValue('Bin1');
    component.formGroup.controls.rackNo.setValue('Rack1');
    component.formGroup.controls.projectUsed.setValue('Project1');

    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should set formgroup as invalid if required data types are provided', () => {
    component.formGroup.controls.manufacturerPartNo.setValue('12345');
    component.formGroup.controls.componentType.setValue('42566');
    component.formGroup.controls.packageSize.setValue('4M');
    component.formGroup.controls.qtyAvailable.setValue('ten');
    component.formGroup.controls.entryDate.setValue('date');
    component.formGroup.controls.binNo.setValue('true');
    component.formGroup.controls.rackNo.setValue('false');
    component.formGroup.controls.projectUsed.setValue(null);

    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should submit form and display success message on successful submission', () => {

    TestBed.inject(MatDialogRef).close = jasmine.createSpy('close');

    spyOn(TestBed.inject(ApiCallsService), 'addComponent').and.returnValue(of({ message: 'Component added successfully' }));

    component.formGroup.setValue({
      manufacturerPartNo: 'ABC123',
      componentType: 'Type1',
      packageSize: '4M',
      qtyAvailable: '19',
      entryDate: '2024-06-19',
      binNo: 'Bin1',
      rackNo: 'Rack1',
      projectUsed: 'Project1'
    });
    component.onSubmit(); 

    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalled();
    expect(component.message).toBe('Component added successfully');
  });

  it('should fail to submit form and display error message on unsuccessful submission', () => {
    spyOn(TestBed.inject(ApiCallsService), 'addComponent').and.returnValue(of({ message: 'component submission failed'}));

    component.formGroup.setValue({
      manufacturerPartNo: 'ABC123',
      componentType: 'Type1',
      packageSize: '4M',
      qtyAvailable: '19',
      entryDate: 'date',
      binNo: 'Bin1',
      rackNo: 'Rack1',
      projectUsed: 'Project1'
    })
    component.onSubmit();

    expect(component.message).toBe('');
    expect(TestBed.inject(MatDialogRef).close).not.toHaveBeenCalled();
  });

  it('should fail to submit form if formGroup is invalid', () => {
    component.formGroup.controls.manufacturerPartNo.setValue('');
    component.formGroup.controls.componentType.setValue('');
    component.formGroup.controls.packageSize.setValue('');
    component.formGroup.controls.qtyAvailable.setValue('');
    component.formGroup.controls.entryDate.setValue('');
    component.formGroup.controls.binNo.setValue('');
    component.formGroup.controls.rackNo.setValue('');
    component.formGroup.controls.projectUsed.setValue('');
  
    component.onSubmit();
  
    expect(component.message).toBe('');
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should reset form on cancel', () => {
    spyOn(component, 'onCancel').and.callThrough(); 
    component.formGroup.controls.manufacturerPartNo.setValue('ABC123');
    component.onCancel();

    expect(component.formGroup.controls.manufacturerPartNo.value).toBeNull();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should fail to reset form if onCancel mrthod is not called', () => {
    spyOn(component, 'onCancel').and.callThrough();

    component.formGroup.controls.manufacturerPartNo.setValue('ABC123');

    expect(component.formGroup.controls.manufacturerPartNo.value).not.toBeNull();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should fail to reset form if form controls are not cleared', () => {
    spyOn(component, 'onCancel').and.callThrough();

    component.formGroup.controls.manufacturerPartNo.setValue('ABC123');
    component.onCancel();

    expect(component.formGroup.controls.manufacturerPartNo.value).toBeNull();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
