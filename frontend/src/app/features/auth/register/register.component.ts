import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private api: ApiService, private authService: AuthService, private router: Router, private toast: ToastService) {}

  register() {
    this.api.register(this.user).subscribe({
      next: () => {

        //AUTOMATICALLY LOGIN AFTER REGISTER
        this.authService.login(this.user.email, this.user.password).subscribe({
          next: (token: any) => {

            localStorage.setItem('token', token);

            const decoded: any = jwtDecode(token);

            localStorage.setItem('user', JSON.stringify({
              email: decoded.sub,
              role: decoded.role
            }));
            this.toast.show("Registration successful", "success");
            this.router.navigate(['/dashboard']);
          }
        });

      },
      error: () => {
        this.toast.show("User already exists", "error");
      }
    });
  }

  goToLogin() {
  this.router.navigate(['/login']);
}
}
