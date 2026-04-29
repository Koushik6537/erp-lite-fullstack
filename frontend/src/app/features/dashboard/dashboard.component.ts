import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalEmployees = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getEmployees().subscribe((data: any[]) => {
      this.totalEmployees = data.length;
    });
  }
}
