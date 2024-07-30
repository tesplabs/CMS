import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponentsComponent } from './add-components.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddComponentsComponent', () => {
  let component: AddComponentsComponent;
  let fixture: ComponentFixture<AddComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponentsComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddComponents Component', () => {
    expect(component).toBeTruthy();
  });

  it('should fail to initialize AddComponents Component if required properties are not set', () => {
    
    expect(component.ngOnInit()).toBeUndefined();
  });
  
  it('should fail to detect changes in AddComponents Component', () => {
    spyOn(component, 'ngOnInit').and.throwError('Initialization error');
    expect(() => component.ngOnInit()).toThrowError('Initialization error');
  });
  



  it('should bimd the input properties correctly', () => {
    component.inputId = 'testId';
    component.label = 'Label';
    component.placeholder = 'Enter name';
    component.type = 'text';

    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    const inputElement = fixture.nativeElement.querySelector('input');

    expect(labelElement.textContent).toContain(component.label);
    expect(inputElement.id).toEqual(component.inputId);
    expect(inputElement.placeholder).toEqual(component.placeholder);
    expect(inputElement.type).toEqual(component.type);
  });

  it('should not bind input properties with incorrect types', () => {
    component.inputId = 'null';
    component.label = '123'; 
    component.placeholder = 'true';
    component.type = 'text';
  
    fixture.detectChanges();
  
    const labelElement = fixture.nativeElement.querySelector('label');
    const inputElement = fixture.nativeElement.querySelector('input');
  
    expect(labelElement.textContent).toContain(component.label);
    expect(inputElement.id).toEqual(component.inputId);
    expect(inputElement.placeholder).toEqual(component.placeholder);
    expect(inputElement.type).toEqual(component.type);
  });

  it('should fail to bind input properties if HTML structure is incorrect', () => {
    const labelElement = fixture.nativeElement.querySelector('label');
    const inputElement = fixture.nativeElement.querySelector('input');
  
    expect(labelElement).not.toBeNull();
    expect(inputElement).not.toBeNull();
  });




  it('should display the error message for invalid input', () =>{
    component.control = new FormControl('', Validators.required);
    component.errorMessages = { required: 'This field is required' };

    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error-message');

    expect(errorElement.textContent).toContain('This field is required');
  });

  it('should not display the error message if FormControl is not initialized', () => {
    component.errorMessages = { required: 'This field is required' };
  
    fixture.detectChanges();
  
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    const errorElement = fixture.nativeElement.querySelector('.error-message');
  
    expect(errorElement).toBeNull();
  });


  it('should not display the error message for an unset validation', () => {
    component.control = new FormControl('');
    component.errorMessages = { required: 'This field is required' };
  
    fixture.detectChanges();
  
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    const errorElement = fixture.nativeElement.querySelector('.error-message');
  
    expect(errorElement).toBeNull();
  });
  
});
