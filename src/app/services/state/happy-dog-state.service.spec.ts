import { TestBed } from '@angular/core/testing';

import { HappyDogStateService } from './happy-dog-state.service';

describe('HappyDogStateService', () => {
  let service: HappyDogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappyDogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
