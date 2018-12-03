import { TestBed } from '@angular/core/testing';

import { ExpressService } from './express.service';

describe('ExpressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpressService = TestBed.get(ExpressService);
    expect(service).toBeTruthy();
  });
});
