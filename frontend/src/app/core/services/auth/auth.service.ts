import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) {}

  login(email: string, password: string) {
    return this.api.login({ email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // getUser() {
  //   return JSON.parse(localStorage.getItem('user') || '{}');
  // }

  getRole(): string {
    const token = localStorage.getItem('token');

    if (!token) return '';

    const decoded: any = jwtDecode(token);

    return decoded.role;
  }

  getEmail(): string {
    const token = localStorage.getItem('token');

    if (!token) return '';

    const decoded: any = jwtDecode(token);

    return decoded.sub;  // subject = email
  }
}