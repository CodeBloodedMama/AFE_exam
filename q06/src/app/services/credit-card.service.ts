import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../credit-card/model';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  rootUrl = environment.apiUrl;
  port = environment.port;
  http: HttpClient;
  snackBar: MatSnackBar;

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    this.http = http;
    this.snackBar = snackBar;
  }

  getCreditCards(): Observable<CreditCard[]> {
    let snackref = this.snackBar.open('Getting all cards', 'Close');
    let cards =  this.http
      .get<CreditCard[]>(`${this.rootUrl + this.port}/cards/`)
      .pipe(
        //map is closing loading snack bar and opening success snack bar
        map((results) => {
          snackref.dismiss();
          this.snackBar.open(
            `Succesfully got ${results.length} cards`,
            'Super',
            {
              duration: 3000,
              panelClass: 'SnackbarSuccess',
            }
          );
          return results;
        }),

        catchError((e) => this.handleErrorCreditCardNumber(e, 0))
      );
      return cards;
  }

  getCreditCard(card_number: number): Observable<CreditCard> {
    let snackref = this.snackBar.open(`Getting card ${card_number}`, 'Close');
    let card = this.http
      .get<CreditCard>(`${this.rootUrl + this.port}/cards/${card_number}`)
      .pipe(
        //map is closing loading snack bar and opening success snack bar
        map((card) => {
          snackref.dismiss();
          this.snackBar.open(`Succesfully got card ${card_number}`, 'Close', {
            duration: 3000,
            panelClass: 'SnackbarSuccess',
          });
          return card;
        }),

        catchError((e) => this.handleErrorCreditCardNumber(e, card_number))
      );
      
      return card;
  }

  deleteCard(card_number: number, location?: Location): Observable<CreditCard> {
    let snackref = this.snackBar.open(`Deleting card ${card_number}`, 'Close');
    return this.http
      .delete<CreditCard>(`${this.rootUrl + this.port}/cards/${card_number}`)
      .pipe(
        //map is closing loading snack bar and opening success snack bar
        map((card) => {
          snackref.dismiss();
          this.snackBar.open(
            `Succesfully deleted card ${card_number}`,
            'Close',
            {
              duration: 3000,
              panelClass: 'SnackbarSuccess',
            }
          );
          location?.back();
          return card;
        }),
        catchError((e) => this.handleErrorCreditCardNumber(e, card_number))
      );
  }

  postCreditCard(card: CreditCard): Observable<CreditCard> {
    let snackref = this.snackBar.open(
      `Adding card ${card.card_number}`,
      'Close'
    );
    return this.http
      .post<CreditCard>(this.rootUrl + this.port + '/cards/', card)
      .pipe(
        //map is closing loading snack bar and opening success snack bar
        map((card) => {
          snackref.dismiss();
          this.snackBar.open(
            `Succesfully added card ${card.card_number}`,
            'Close',
            {
              duration: 3000,
              panelClass: 'SnackbarSuccess',
            }
          );
          return card;
        }),
        catchError((e) =>
          this.handleErrorCreditCardNumber(e, Number(card.card_number))
        )
      );
  }

  handleErrorCreditCardNumber(error: HttpErrorResponse, card_number: Number) {
    if (error.status === 0) {
      this.snackBar.open(
        'A client-side or network error occurred. Handle it accordingly.',
        'Close',
        {
          duration: 5000,
          panelClass: 'SnackbarError',
        }
      );
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      console.error('When adding card:', card_number);
    } else {
      this.snackBar.open(
        `Backend returned code ${error.status}, body was: ${error.error}`,
        'Close',
        {
          duration: 5000,
          panelClass: 'SnackbarError',
        }
      );
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
