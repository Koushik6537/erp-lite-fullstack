import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(SpinnerService);

  spinner.show();

  return next(req).pipe(
    delay(1000),
    finalize(() => spinner.hide())
  );
};
