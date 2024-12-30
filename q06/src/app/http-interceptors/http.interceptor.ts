import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  let ok: string;

  return next(req).pipe(
    tap(
      (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
      (error) => (ok = 'failed')
    ),
    finalize(() => {
      const elapsed = Date.now() - started;
      const msg = `${req.method} ${req.urlWithParams} ${ok} in ${elapsed} ms.`;
      console.log(msg);
    })
  );
};
