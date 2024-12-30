import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CreditCardAddComponent } from './credit-card-add/credit-card-add.component';
import { CreditCardDetailsComponent } from './credit-card/credit-card-details/credit-card-details.component';
import { CreditCardListComponent } from './credit-card/credit-card-list/credit-card-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'q06 Home',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About q06',
  },
  {
    //Overview of the credit cards in a list
    path: 'creditcard',
    component: CreditCardListComponent,
    title: 'Credit Cards',
  },
  {
    //details of a specific credit card
    path: 'creditcard/details/:card_number',
    component: CreditCardDetailsComponent,
    title: 'Credit Card Details',
  },
  {
    //form to add a new credit card
    path: 'creditcard/add',
    component: CreditCardAddComponent,
    title: 'Add Credit Card',
  },
  {
    //Transaction screen
    path: 'transaction',
    loadChildren: () =>
      import('./transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
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
