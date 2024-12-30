import { TestBed } from '@angular/core/testing';

import { RequestLoggerInterceptor } from './request-logger.interceptor';

describe('RequestLoggerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestLoggerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestLoggerInterceptor = TestBed.inject(RequestLoggerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
