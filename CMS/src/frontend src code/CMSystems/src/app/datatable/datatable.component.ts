import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ApiCallsService } from '../services/api-calls.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MainComponent } from '../main/main.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements AfterViewInit{

  displayedColumns: string[] = 
            ['serialNo', 'manufacturerPartNum','componentType', 'packageSize', 'quantityAvailable', 'entryDate', 'binNumber', 'rackNumber', 'projectUsed','actions'];

  components: any[] = [];
  dataSource = new MatTableDataSource<any>(this.components);
  filterValue: string = '';
  showSearchInput: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private dialog: MatDialog, private apiService: ApiCallsService) { }

  ngOnInit(){
    this.fetchComponents();
  }

  ngAfterViewInit(){
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  fetchComponents(): void {
    this.apiService.getComponent().subscribe({
      next: (response: any) => {
        const components = response as Component[];
        this.dataSource.data = components;
      },
      error: (error) => {
        console.error('Error while fetching components:', error);
      }
    });
  }
  
  applyFilter(){
    if(this.dataSource){
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    }
  }

  applyColumnFilter(filterValue: string, column: string){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter.toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(event:any){
    if(this.sort && this.dataSource.sort && this.displayedColumns.includes(event.active)){
      const isAsc = event.direction === 'asc';
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property){
          case 'entryDate': return new Date(item[property]);
          default: return item[property];
        }
      };
      this.dataSource.sort.sort({ id: event.active, start: isAsc ? 'asc' : 'desc', disableClear: false });
    }
  }

  openDialog(component?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if(component){
      dialogConfig.data = { component };
    }

    const dialogRef = this.dialog.open(MainComponent, dialogConfig);

    dialogRef.componentInstance.componentAdded.subscribe(() => {
      // Refresh data table after component is added
      this.fetchComponents();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
      }
    });
  }

  deleteComponent(serialNo: number): void{
    const confirmed = confirm('Are you sure!! You want to delete this?');
    if(confirmed){
      console.log('Deleting component with serialNo:', serialNo);
      this.apiService.deleteComponent(serialNo).subscribe({
        next: () => {
          console.log('Component deleted successfully');
          this.fetchComponents();
          alert('Component deleted successfully')

        },
        error: (error) =>{
          console.error('Error in deleting component', error);
        }
      });
    }
  }
}