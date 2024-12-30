import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestLoggerInterceptor } from './request-logger.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLoggerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
