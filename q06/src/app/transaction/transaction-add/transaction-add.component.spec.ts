import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAddComponent } from './transaction-add.component';

describe('TransactionAddComponent', () => {
  let component: TransactionAddComponent;
  let fixture: ComponentFixture<TransactionAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionAddComponent]
    });
    fixture = TestBed.createComponent(TransactionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
