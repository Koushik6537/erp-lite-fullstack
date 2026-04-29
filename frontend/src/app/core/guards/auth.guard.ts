import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // ✅ 1. Check login
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // ✅ 2. Role check
  const expectedRole = route.data?.['role'];
  const userRole = authService.getRole();

  if (expectedRole && userRole !== expectedRole) {
    alert('Access denied');
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};