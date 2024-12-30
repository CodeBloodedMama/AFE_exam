import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueComponent } from './blue.component';

describe('BlueComponent', () => {
  let component: BlueComponent;
  let fixture: ComponentFixture<BlueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlueComponent]
    });
    fixture = TestBed.createComponent(BlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
