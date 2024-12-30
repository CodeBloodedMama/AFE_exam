import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionOverviewComponent,
    title: 'Trasactions',
  },
  {
    path: 'add',
    component: TransactionAddComponent,
    title: 'AddTransaction',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
