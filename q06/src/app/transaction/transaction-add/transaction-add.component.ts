import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/credit-card/model';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from '../model';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
})
export class TransactionAddComponent implements OnInit {
  transactionForm = this.fb.group({
    credit_card: ['', Validators.required],
    amount: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
    ],
    currency: ['', Validators.required],
    comment: [''],
    date: ['', Validators.required],
    uid: [''],
  });

  creditCards: CreditCard[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private creditCardService: CreditCardService
  ) {  }
  // ngOninit() is a lifecyclehook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    this.creditCardService.getCreditCards().subscribe((response) => {
      this.creditCards = response;
    });
  }
// formToTransaction() is a function that takes a form and returns a transaction object.
  formToTransaction(form: FormGroup): Transaction {
    const transaction: Transaction = {
      credit_card:
        this.creditCards.find(
          (card) => card.card_number === Number(form.get('credit_card_number'))
        ) ?? this.creditCards[0],
      amount: Number(form.get('amount')?.value),
      currency: form.get('currency')?.value,
      comment: form.get('comment')?.value,
      date: form.get('date')?.value,
      // generate a uid as a hash of the rest of the transaction
      uid: form
        .get('credit_card_number')
        ?.value.concat(form.get('amount')?.value)
        .concat(form.get('currency')?.value)
        .concat(form.get('comment')?.value)
        .concat(form.get('date')?.value)
        .hashCode(),
    };

    return transaction;
  }
  // onSubmit() is a function that is called when the form is submitted.
  // its a lifehook cycle called after Angular has initialized all data-bound properties of a directive.
  onSubmit() {
    console.log('Transaction form submitted:', this.transactionForm)
    if (this.transactionForm.valid) {
      this.transactionService
        .postTransactions(
          this.formToTransaction(this.transactionForm)
        )
        .subscribe((response) => {
          console.log('Transaction added:', response);
          // reset form
          this.transactionForm.reset();
        });
    }
  }
}
