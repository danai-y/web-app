import { TestBed } from '@angular/core/testing';

import { CusNavService } from './cus-nav.service';

describe('CusNavService', () => {
  let service: CusNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CusNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
