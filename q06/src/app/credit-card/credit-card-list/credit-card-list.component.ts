import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CreditCard } from '../model';
CommonModule;
AsyncPipe;

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.scss'],
})
export class CreditCardListComponent implements OnInit {
  creditCards$: Observable<CreditCard[]> | null = null;
  storedCards: CreditCard[] = [];
  constructor(CreditCardService: CreditCardService) {
    this.storedCards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards') || '{}') : [];
    
    this.creditCards$ = CreditCardService.getCreditCards();
    this.creditCards$.subscribe({
      next: (value) => {
        localStorage.setItem('cards', JSON.stringify(value));
      },
    });
  }
  ngOnInit(): void {
    this.creditCards$ = this.creditCards$;
    this.storedCards = this.storedCards;
  }
}
