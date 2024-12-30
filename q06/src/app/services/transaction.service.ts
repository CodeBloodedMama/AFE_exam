import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../transaction/model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  rootUrl = environment.apiUrl;
  port = environment.port;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.rootUrl + this.port}/transactions`
    );
  }

  getTransactionsByCreditCardId(
    creditCardId: number
  ): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.rootUrl + this.port}/transactions`)
      .pipe(
        map((transactions) => {
          return transactions.filter(
            (transaction) =>
              transaction.credit_card.card_number === creditCardId
          );
        })
      );
  }

  postTransactions(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(
        this.rootUrl + this.port + '/transactions/',
        transaction
      )
      .pipe(
        catchError((e) => this.handleErrorTransactionUid(e, transaction.uid))
      );
  }

  deleteTransactions(transaction_uid: String): Observable<Transaction> {
    return this.http
      .delete<Transaction>(
        `${this.rootUrl + this.port}/transactions/${transaction_uid}`
      )
      .pipe(
        catchError((e) => this.handleErrorTransactionUid(e, transaction_uid))
      );
  }

  handleErrorTransactionUid(error: HttpErrorResponse, card_number: String) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      console.error('When adding card:', card_number);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
