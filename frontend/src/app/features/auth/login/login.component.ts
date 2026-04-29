import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toast: ToastService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res: any) => {

          //Saves token
          localStorage.setItem('token', res);

          //Decodes token
          const decoded: any = jwtDecode(res);

          //Saves user
          localStorage.setItem('user', JSON.stringify({
            email: decoded.sub,
            role: decoded.role
          }));

          //Navigates to dashboard
          this.router.navigate(['/dashboard']);
        },

        error: (err: any) => {
          if (err.status === 404) {
            this.toast.show("User not found. Redirecting...", "info");

            setTimeout(() => {
              console.log("Navigating to register page...");
              this.router.navigate(['/register']);
            }, 100);
          }
          else if (err.status === 401) {
            this.toast.show("Invalid password", "error");
          }
          else {
            this.toast.show("Something went wrong", "error");
          }
        }
      });
    }
  }
}