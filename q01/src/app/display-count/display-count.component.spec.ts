import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCountComponent } from './display-count.component';

describe('DisplayCountComponent', () => {
  let component: DisplayCountComponent;
  let fixture: ComponentFixture<DisplayCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DisplayCountComponent]
    });
    fixture = TestBed.createComponent(DisplayCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
