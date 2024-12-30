import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CreditCard } from '../model';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss'],
})
export class CreditCardDetailsComponent {
  creditCard$: Observable<CreditCard> | null = null;
  constructor(
    private route: ActivatedRoute,
    private service: CreditCardService,
    private location: Location
  ) {
    route.paramMap.subscribe((params) => {
      this.creditCard$ = service.getCreditCard(
        parseInt(params.get('card_number') || '0')
      );
    });
  }

  deleteCreditCard(cardNumber: number): void {
    //if successful, go back to the previous page
    this.service.deleteCard(cardNumber, this.location).subscribe();
  }
}
