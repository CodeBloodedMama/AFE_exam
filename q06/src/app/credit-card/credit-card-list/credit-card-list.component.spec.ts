import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardListComponent } from './credit-card-list.component';

describe('CreditCardListComponent', () => {
  let component: CreditCardListComponent;
  let fixture: ComponentFixture<CreditCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardListComponent]
    });
    fixture = TestBed.createComponent(CreditCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
