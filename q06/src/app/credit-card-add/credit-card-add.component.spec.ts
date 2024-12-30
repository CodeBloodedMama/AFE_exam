import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardAddComponent } from './credit-card-add.component';

describe('CreditCardAddComponent', () => {
  let component: CreditCardAddComponent;
  let fixture: ComponentFixture<CreditCardAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreditCardAddComponent]
    });
    fixture = TestBed.createComponent(CreditCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
