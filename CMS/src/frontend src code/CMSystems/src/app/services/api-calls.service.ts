import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  private apiUrl = 'https://localhost:7230/api/Components/';

  constructor(private http: HttpClient) { }

  getComponent(): Observable<any> {
    return this.http.get(this.apiUrl + 'GetComponents').pipe(
      catchError(this.handleError)
    );
  }

  addComponent(componentData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'AddComponents', componentData);
  }

  updateComponent( component: any): Observable<any> {
    return this.http.put(`${this.apiUrl}UpdateComponents`, component, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteComponent(serialNo: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}DeleteComponent/${serialNo}`);
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {

    const allowedExtensions = ['xlsx', 'xls']
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if(!fileExtension || !allowedExtensions.includes(fileExtension)){
      return throwError(new Error('Invalid file type, Only excel files are allowed.'));
    }

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.apiUrl}UploadExcel`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  
}
