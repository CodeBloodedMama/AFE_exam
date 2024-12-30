import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pickGuard } from './pick.guard';

describe('pickGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pickGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
