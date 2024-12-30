import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';
import { TransactionRoutingModule } from './transaction-routing.module';

@NgModule({
  declarations: [TransactionOverviewComponent, TransactionAddComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TransactionListComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
})
export class TransactionModule {}
