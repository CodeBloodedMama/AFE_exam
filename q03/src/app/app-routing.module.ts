import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickComponent } from './pick/pick.component';
import { NumberComponent } from './number/number.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { pickGuard } from './pick.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'Lazy',
    loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule),
  },
  {
    path: 'Pick',
    component: PickComponent,
    title: 'Pick a number',
  },
  {
    path: 'Pick/:number',
    component: NumberComponent,
    title: 'You picked a number',
    canActivate: [pickGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
