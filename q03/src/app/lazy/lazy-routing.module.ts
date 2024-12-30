import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyComponent } from './lazy.component';
import { RedComponent } from './red/red.component';
import { BlueComponent } from './blue/blue.component';

const routes: Routes = [
  { path: '', component: LazyComponent },
  { path: 'Red', component: RedComponent },
  { path: 'Blue', component: BlueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyRoutingModule {}
