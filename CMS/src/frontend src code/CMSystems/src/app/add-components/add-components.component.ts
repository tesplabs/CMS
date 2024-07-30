import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-components',
  templateUrl: './add-components.component.html',
  styleUrl: './add-components.component.css'
})
export class AddComponentsComponent implements OnInit{

  @Input() inputId = '';
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() isDropdown: boolean = false;
  @Input() options: { value: string, viewValue: string }[] = [];

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>; 

  errorMessages: Record<string,string> = {
    required:'This field is required',
    pattern: 'Invalid pattern',
    date: 'Invalid date format',
    number: 'Invalid number format',
  };

  constructor() {}

  ngOnInit(): void {
    
  }
}
