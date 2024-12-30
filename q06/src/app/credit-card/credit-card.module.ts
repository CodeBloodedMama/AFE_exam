import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreditCardAddComponent } from '../credit-card-add/credit-card-add.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { CreditCardExpDateFormatPipe } from './credit-card-exp-date-format.pipe';
import { CreditCardFormatPipe } from './credit-card-format.pipe';
import { CreditCardListItemComponent } from './credit-card-list/credit-card-list-item/credit-card-list-item.component';
import { CreditCardListComponent } from './credit-card-list/credit-card-list.component';

@NgModule({
  declarations: [
    CreditCardListComponent,
    CreditCardDetailsComponent,
    CreditCardListItemComponent,
    CreditCardFormatPipe,
    CreditCardExpDateFormatPipe,
  ],
  imports: [
    CommonModule,
    AsyncPipe,
    RouterModule,
    CreditCardAddComponent,
    TransactionListComponent,
  ],
  exports: [
    CreditCardListComponent
  ]
})
export class CreditCardModule {}
