import { TestBed } from '@angular/core/testing';

import { MainUIResolver } from './mainUI.resolver';

describe('WishlistResolver', () => {
  let resolver: MainUIResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MainUIResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
