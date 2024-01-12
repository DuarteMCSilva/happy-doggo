import { TestBed } from '@angular/core/testing';
import { DogApiService } from './dog-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('DogApiService', () => {
  let service: DogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DogApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
