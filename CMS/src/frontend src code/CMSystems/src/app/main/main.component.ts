import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from '../services/api-calls.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatatableComponent } from '../datatable/datatable.component';
import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [DatePipe]
})
export class MainComponent implements OnInit {

  @Output() componentAdded: EventEmitter<any> = new EventEmitter<void>();

  displayTable: boolean = false;
  components: any[] = [];
  newComponent: any = {};
  message: string = '';
  messageType?: 'success' | 'error';
  formValues: any;
  file: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';

  formGroup = new FormGroup({
    //serialNo: new FormControl(null),
    manufacturerPartNo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    componentType: new FormControl('', Validators.required),
    packageSize: new FormControl('', Validators.required), //Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    qtyAvailable: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    entryDate: new FormControl('', Validators.required), //Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]),
    binNo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    rackNo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    projectUsed: new FormControl('', Validators.required),
  })

  componentTypeOptions = [
    {value: 'Anti-Static, ESD, Clean Room Products', viewValue: 'Anti-Static, ESD, Clean Room Products'},
    {value: 'Audio Parts', viewValue: 'Audio Parts'},
    {value: 'Battery Products', viewValue: 'Battery Products'},
    {value: 'Boxes, Enclosures, Racks', viewValue: 'Boxes, Enclosures, Racks'},
    {value: 'Cable Assemblies', viewValue: 'Cable Assemblies'},
    {value: 'Cables, Wires', viewValue: 'Cables, Wires'},
    {value: 'Cables, Wires - Management', viewValue: 'Cables, Wires - Management'},
    {value: 'Capacitor', viewValue: 'Capacitor'},
    {value: 'Circuit Protection', viewValue: 'Circuit Protection'},
    {value: 'Computer Equipment', viewValue: 'Computer Equipment'},
    {value: 'Connectors, Interconnects', viewValue: 'Connectors, Interconnects'},
    {value: 'Crystals, Oscillators, Resonators', viewValue: 'Crystals, Oscillators, Resonators'},
    {value: 'Development Boards, Kits, Programmers', viewValue: 'Development Boards, Kits, Programmers'},
    {value: 'Discrete Semiconductor Products', viewValue: 'Discrete Semiconductor Products'},
    {value: 'Embedded Computers', viewValue: 'Embedded Computers'},
    {value: 'Fans, Blowers, Thermal Management', viewValue: 'Fans, Blowers, Thermal Management'},
    {value: 'Filters', viewValue: 'Filters'},
    {value: 'Hardware, Fasteners, Accessories', viewValue: 'Hardware, Fasteners, Accessories'},
    {value: 'Inductors, Coils, Chokes', viewValue: 'Inductors, Coils, Chokes'},
    {value: 'Industrial Automation and Controls', viewValue: 'Industrial Automation and Controls'},
    {value: 'Industrial Supplies', viewValue: 'Industrial Supplies'},
    {value: 'Integrated Circuits (ICs)', viewValue: 'Integrated Circuits (ICs)'},
    {value: 'Isolators', viewValue: 'Isolators'},
    {value: 'Kits', viewValue: 'Kits'},
    {value: 'Labels, Signs, Barriers, Identification', viewValue: 'Labels, Signs, Barriers, Identification'},
    {value: 'Line Protection, Distribution, Backups', viewValue: 'Line Protection, Distribution, Backups'},
    {value: 'Magnetics - Transformer, Inductor Components', viewValue: 'Magnetics - Transformer, Inductor Components'},
    {value: 'Maker/DIY, Educational', viewValue: 'Maker/DIY, Educational'},
    {value: 'Memory - Modules, Cards', viewValue: 'Memory - Modules, Cards'},
    {value: 'Motors, Actuators, Solenoids and Drivers', viewValue: 'Motors, Actuators, Solenoids and Drivers'},
    {value: 'Networking Solutions', viewValue: 'Networking Solutions'},
    {value: 'Optical Inspection Equipment', viewValue: 'Optical Inspection Equipment'},
    {value: 'Optics', viewValue: 'Optics'},
    {value: 'Optoelectronics', viewValue: 'Optoelectronics'},
    {value: 'Potentiometers, Variable Resistors', viewValue: 'Potentiometers, Variable Resistors'},
    {value: 'Power Supplies - Board Mount', viewValue: 'Power Supplies - Board Mount'},
    {value: 'Power Supplies - External/Internal (Off-Board)', viewValue: 'Power Supplies - External/Internal (Off-Board)'},
    {value: 'Prototyping, Fabrication Products', viewValue: 'Prototyping, Fabrication Products'},
    {value: 'Relays', viewValue: 'Relays'},
    {value: 'Resistors', viewValue: 'Resistors'},
    {value: 'RF and Wireless', viewValue: 'RF and Wireless'},
    {value: 'Sensors, Transducers', viewValue: 'Sensors, Transducers'},
    {value: 'Soldering, Desoldering, Rework Products', viewValue: 'Soldering, Desoldering, Rework Products'},
    {value: 'Switches', viewValue: 'Switches'},
    {value: 'Tapes, Adhesives, Materials', viewValue: 'Tapes, Adhesives, Materials'},
    {value: 'Test and Measurement', viewValue: 'Test and Measurement'},
    {value: 'Tools', viewValue: 'Tools'},
    {value: 'Transformers', viewValue: 'Transformers'},
    {value: 'Uncategorized', viewValue: 'Uncategorized'}    
  ]

  packageSizeOptions = [
    {value: 'Bag', viewValue: 'Bag'},
    {value: 'Box', viewValue: 'Box'},
    {value: 'Bulk', viewValue: 'Bulk'},
    {value: 'Case', viewValue: 'Case'},
    {value: 'Cut Tape(CT)', viewValue: 'Cut Tape(CT)'},
    {value: 'Digi-Reel', viewValue: 'Digi-Reel'},
    {value: 'Retail Package', viewValue: 'Retail Package'},
    {value: 'Strip', viewValue: 'Strip'},
    {value: 'Tape & Box(TB)', viewValue: 'Tape & Box (TB)'},
    {value: 'Tape & Reel (TR)', viewValue: 'Tape & Reel (TR)'},
    {value: 'Tray', viewValue: 'Tray'},
    {value: 'Tube', viewValue: 'Tube'},
  ]

  constructor(
              private apiService: ApiCallsService, 
              private dialogRef: MatDialogRef<DatatableComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe,
            ) 
            { 
              if(data && data.component){
                const patchedData = {
                  ...data.component,
                  entryDate: this.datePipe.transform(data.component.entryDate, 'yyyy-MM-dd')
                };
                this.formGroup.patchValue(patchedData);
              }
            }

  ngOnInit(): void { }

  onSubmit() {
    if (this.formGroup.valid) {
      var req_body: any = {};
      //req_body['serialNo'] = 0;//this.formGroup.controls.serialNo.value; // SerialNo will be set by the backend
      req_body['manufacturerPartNo'] = this.formGroup.controls.manufacturerPartNo.value;
      req_body['componentType'] = this.formGroup.controls.componentType.value;
      req_body['packageSize'] = this.formGroup.controls.packageSize.value;
      req_body['qtyAvailable'] = parseInt(this.formGroup.controls.qtyAvailable.value ?? '0', 10);
      req_body['entryDate'] = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS\'Z\'');
      req_body['binNo'] = this.formGroup.controls.binNo.value;
      req_body['rackNo'] = this.formGroup.controls.rackNo.value;
      req_body['projectUsed'] = this.formGroup.controls.projectUsed.value;

      console.log('Request Body:', req_body);
      
      //Edit Componnent method                     
      if(this.data && this.data.component ){
        req_body['serialNo'] = this.data.component.serialNo;
        this.apiService.updateComponent(req_body).subscribe({
          next:(response) => {
            console.log('Component updated successfully:', response);
            this.componentAdded.emit();
            this.messageType = 'success';
            this.message = "Component Updated Successfully";
            this.formGroup.reset();
            alert('Component Updated Successfully');
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('Error in updating component', error);
            this.messageType = 'error';
            this.message = "Error while Updating the Component";
          }
        });
      } 
      // Add Component Method
      else{
        this.apiService.addComponent(req_body).subscribe({
          next: (response) => { 
            console.log('Component added successfully:', response);
            this.componentAdded.emit();
            this.messageType = 'success';
            this.message = 'Component added successfully';
            this.formGroup.reset();
            alert('Component Added Successfully');
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('Error adding component:', error);
            // console.log('Error details:', error.message, error.error);
            this.messageType = 'error';
            this.message = 'Error while adding component';
          }
        });
      } 
    }
    else{
      console.error('Form is invalid:', this.formGroup);
    }
  }

  onCancel(): void {
    this.formGroup.reset();
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }


  onFileUpload(): void {
    if(this.file){
      this.uploadProgress = 0;
      this.uploadMessage = '';
      this.apiService.uploadFile(this.file).subscribe({
        next: (event) => {
          if (event.type == HttpEventType.UploadProgress){
            this.uploadProgress = Math.round(100 * (event.loaded / (event.total ?? 1)));
          } else if (event instanceof HttpResponse) {
            this.uploadMessage = event.body ? event.body : 'File Uploaded Successfully';
            alert('File Uploaded Successfully');
            this.componentAdded.emit();
            this.file = null;
          }
        },
        error: (error) => {
          console.error('File Upload Failed:', error);
          this.uploadMessage = 'Failed to upload the file';
          console.log(this.uploadMessage = `File Upload Failed: ${error.message}`);
          this.uploadProgress = 0;
        }
      });
    }
  }
}
