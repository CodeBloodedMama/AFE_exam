import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindComponent } from './tailwind.component';

describe('TailwindComponent', () => {
  let component: TailwindComponent;
  let fixture: ComponentFixture<TailwindComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailwindComponent]
    });
    fixture = TestBed.createComponent(TailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
