import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      toastr.error(`Something went wrong: ${err.message}`);
      throw err;
    })
  );
}
