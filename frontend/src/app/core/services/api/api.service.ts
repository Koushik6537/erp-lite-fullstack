import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  //CREATE
  addEmployee(data: any) {
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  //READ
  getEmployees() {
    return this.http.get<any[]>(`${this.baseUrl}/employees`);
  }

  //UPDATE
  updateEmployee(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/employees/${id}`, data);
  }

  //DELETE
  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data, {
      responseType: 'text'
    });
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data, { responseType: 'text' });
  }
}