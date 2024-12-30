import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { RedComponent } from './red/red.component';
import { BlueComponent } from './blue/blue.component';


@NgModule({
  declarations: [
    LazyComponent,
    RedComponent,
    BlueComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
