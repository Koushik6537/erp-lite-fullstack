import { Component } from '@angular/core';
import { RouterLinkActive } from "@angular/router";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";


@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive, RouterModule, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.role = this.authService.getRole();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
