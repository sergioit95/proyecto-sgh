// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {username: '', password: ''};

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      success => console.log('Login successful'),
      error => {
        console.log('Login failed');
        if (error.status === 405 && error.url === 'http://localhost:8080/login?error') {
          console.log('Invalid credentials');        }
      }
    );
  }
}