import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { DisplayCountComponent } from './display-count/display-count.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponentComponent,
  ],
  imports: [
    BrowserModule,
    DisplayCountComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
