import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // constructor(private authService: AuthService, private router: Router) {}

  // onSubmit(){
  //   this.authService.login(this.username, this.password).subscribe(
  //     response => {

  //     },
  //     error => {
  //       this.errorMessage = 'Invalid username or password';
  //     }
  //   );
  // }
}



//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit() {
//     this.authService.login(this.username, this.password).subscribe(
//       response => {
//         // Assuming the backend sends a token
//         localStorage.setItem('token', response.token);
//         this.router.navigate(['/dashboard']); // Redirect to a dashboard or any other route
//       },
//       error => {
//         this.errorMessage = 'Invalid username or password';
//       }
//     );
//   }
// }
