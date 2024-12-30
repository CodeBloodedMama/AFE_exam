import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../transaction/model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [CommonModule, AgGridModule],
})
export class TransactionListComponent implements OnInit {
  rowData = [] as Transaction[];
  columnDefs: ColDef[] = [
    {
      headerName: 'Card Number',
      field: 'credit_card.card_number',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    { headerName: 'Amount', field: 'amount', sortable: true, filter: true },
    { headerName: 'Currency', field: 'currency', sortable: true, filter: true },
    { headerName: 'Comment', field: 'comment', sortable: true, filter: true },
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];
  @Input() creditCardId?: number;

  ngOnInit(): void {
    console.log('from init CreditcardIs is: ', this.creditCardId);

    if (!this.creditCardId) {
      this.transactionService.getTransactions().subscribe((transactions) => {
        this.rowData = transactions;
      });
    } else {
      this.transactionService
        .getTransactionsByCreditCardId(this.creditCardId)
        .subscribe((transactions) => {
          this.rowData = transactions;
        });
      //remove filter on card number but keep the rest of the column
      this.columnDefs = this.columnDefs.filter(
        (column) => column.field !== 'credit_card.card_number'
      );
    }
  }

  constructor(private transactionService: TransactionService) {}
}
