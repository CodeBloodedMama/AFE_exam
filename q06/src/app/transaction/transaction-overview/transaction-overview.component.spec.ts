import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOverviewComponent } from './transaction-overview.component';

describe('TransactionOverviewComponent', () => {
  let component: TransactionOverviewComponent;
  let fixture: ComponentFixture<TransactionOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionOverviewComponent]
    });
    fixture = TestBed.createComponent(TransactionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
