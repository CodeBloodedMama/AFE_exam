import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardListItemComponent } from './credit-card-list-item.component';

describe('CreditCardListItemComponent', () => {
  let component: CreditCardListItemComponent;
  let fixture: ComponentFixture<CreditCardListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardListItemComponent]
    });
    fixture = TestBed.createComponent(CreditCardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
