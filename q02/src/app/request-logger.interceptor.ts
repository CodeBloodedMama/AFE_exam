import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestLoggerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {'X-Request-Logger': 'OutOwnRequestLoggerInterceptor'}
    });

    console.log(`RequestLoggerInterceptor: ${request.url}`);
    
    return next.handle(modifiedRequest);
  }
}
