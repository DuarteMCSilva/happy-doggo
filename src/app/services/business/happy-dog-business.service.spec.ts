import { TestBed } from '@angular/core/testing';
import { HappyDogBusinessService } from './happy-dog-business.service';
import { HttpClientModule } from '@angular/common/http';
import { DogApiService, GetResponseBreeds } from '../api/dog-api.service';
import { of } from 'rxjs';
import { HappyDogStateService } from '../state/happy-dog-state.service';

describe('HappyDogBusinessService', () => {
  let service: HappyDogBusinessService;
  let dogApiService: DogApiService;
  let happyDogStateService: HappyDogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(HappyDogBusinessService);
    dogApiService = TestBed.inject(DogApiService);
    happyDogStateService = TestBed.inject(HappyDogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update breed info to happyDogStateService', () => {
    const mockedApiResponse: GetResponseBreeds = {
      message: {
        'spaniel': ['cocker', 'brittany'],
        'australian': [ 'shepherd' ],
        'akita': []
      },
      status: 'success'
    }

    const expectedReturn = [
      { name: 'spaniel', subBreeds: ['cocker', 'brittany'] },
      { name: 'australian', subBreeds: ['shepherd'] },
      { name: 'akita', subBreeds: [] }
    ]

    spyOn(dogApiService, 'getAllBreeds').and.returnValue(of(mockedApiResponse));
    service.getAllBreeds()
    expect(happyDogStateService.breedsTree).toEqual(expectedReturn);
  });

  it('should call fetchImageByBreed when no subBreed is passed', () => {
    const byBreedSpy = spyOn(dogApiService, 'getDoggoByBread');
    const bySubBreedSpy = spyOn(dogApiService, 'getDoggoBySubBread');
    service.fetchImageByBreed('spaniel', '', 1);  
    expect(byBreedSpy).toHaveBeenCalled();
    expect(bySubBreedSpy).not.toHaveBeenCalled();
  });

  it('should call fetchImageBySubBreed when subBreed is passed', () => {
    const byBreedSpy = spyOn(dogApiService, 'getDoggoByBread');
    const bySubBreedSpy = spyOn(dogApiService, 'getDoggoBySubBread');
    service.fetchImageByBreed('spaniel', 'brittany', 1);  
    expect(byBreedSpy).not.toHaveBeenCalled();
    expect(bySubBreedSpy).toHaveBeenCalled();
  });
});
