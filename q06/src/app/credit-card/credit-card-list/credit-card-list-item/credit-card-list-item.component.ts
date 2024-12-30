import { Component, Input } from '@angular/core';
import { CreditCard } from '../../model';

@Component({
  selector: 'app-credit-card-list-item',
  templateUrl: './credit-card-list-item.component.html',
  styleUrls: ['./credit-card-list-item.component.scss'],
})
export class CreditCardListItemComponent {
  @Input()
  creditCard: CreditCard | null = null;

  constructor() {}
  openCardDetails = () => {};
}
