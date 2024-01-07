import { TestBed } from '@angular/core/testing';

import { HappyDogBusinessService } from './happy-dog-business.service';

describe('HappyDogBusinessService', () => {
  let service: HappyDogBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappyDogBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
