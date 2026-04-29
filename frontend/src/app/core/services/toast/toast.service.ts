import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {

  toasts: any[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const toast = { message, type };

    this.toasts.push(toast);

    setTimeout(() => {
      this.toasts.shift();
    }, 3000);
  }
}