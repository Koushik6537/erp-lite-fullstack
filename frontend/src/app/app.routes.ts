import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  //PUBLIC ROUTES
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },

  //PROTECTED ROUTES
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout/layout.component')
        .then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employee/employee.component')
            .then(m => m.EmployeeComponent),
        data: { role: 'Admin' }
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/task/task.component')
            .then(m => m.TaskComponent)
      },
      {
        path: 'leave',
        loadComponent: () =>
          import('./features/leave/leave.component')
            .then(m => m.LeaveComponent)
      }
    ]
  }
];