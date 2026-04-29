import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];

  searchText: string = '';
  filteredEmployees: any[] = [];

  showDeletePopup: boolean = false;
  employeeToDelete: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  //CREATE
  newEmployee = {
    name: '',
    email: '',
    role: ''
  };

  addEmployee() {
    this.api.addEmployee(this.newEmployee).subscribe(() => {
      this.loadEmployees();
      this.newEmployee = { name: '', email: '', role: '' };
    });
  }

  //READ/VIEW
  loadEmployees() {
    this.api.getEmployees().subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data;
      this.filterEmployees();
    });
  }

  //SEARCH or FILTER EMPLOYEES
  filterEmployees() {
    const search = this.searchText.toLowerCase();

    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search) ||
      emp.role.toLowerCase().includes(search)
    );

    this.currentPage = 1;
  }

  //UPDATE
  editingEmployeeId: number | null = null;

  editEmployee(emp: any) {
    this.newEmployee = { ...emp };
    this.editingEmployeeId = emp.id;
  }

  updateEmployee() {
    if (this.editingEmployeeId !== null) {
      this.api.updateEmployee(this.editingEmployeeId, this.newEmployee).subscribe(() => {
        this.loadEmployees();
        this.newEmployee = { name: '', email: '', role: '' };
        this.editingEmployeeId = null;
      });
    }
  }

  //DELETE
  deleteEmployee(id: number) {
    this.employeeToDelete = id;
    this.showDeletePopup = true;
  }

  confirmDelete() {
    if (this.employeeToDelete !== null) {
      this.api.deleteEmployee(this.employeeToDelete).subscribe(() => {
        this.loadEmployees();
        this.closePopup();
      });
    }
  }

  closePopup() {
    this.showDeletePopup = false;
    this.employeeToDelete = null;
  }

  //PAGENATION
  getPaginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(start, start + this.itemsPerPage);
  }
}
