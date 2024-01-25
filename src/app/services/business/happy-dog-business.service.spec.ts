import { TestBed } from '@angular/core/testing';
import { HappyDogBusinessService } from './happy-dog-business.service';
import { HttpClientModule } from '@angular/common/http';
import { DogApiService, GetResponseBreeds } from '../api/dog-api.service';
import { of, delay } from 'rxjs';
import { HappyDogStateService } from '../state/happy-dog-state.service';

describe('HappyDogBusinessService', () => {
  let service: HappyDogBusinessService;
  let dogApiService: DogApiService;
  let happyDogStateService: HappyDogStateService;
  let happyDogBusinessService: HappyDogBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(HappyDogBusinessService);
    dogApiService = TestBed.inject(DogApiService);
    happyDogStateService = TestBed.inject(HappyDogStateService);
    happyDogBusinessService = TestBed.inject(HappyDogBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllBreeds should update breed info to happyDogStateService', () => {
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

  it('#fetchImageByBreed should call #api.getDoggoByBread when no subBreed is passed', () => {
    const byBreedSpy = spyOn(dogApiService, 'getDoggoByBread');
    const bySubBreedSpy = spyOn(dogApiService, 'getDoggoBySubBread');
    service.fetchImageByBreed(['spaniel', ''], 1);  
    expect(byBreedSpy).toHaveBeenCalled();
    expect(bySubBreedSpy).not.toHaveBeenCalled();
  });

  it('#fetchImageByBreed should call #api.getDoggoBySubBread when subBreed is passed', () => {
    const byBreedSpy = spyOn(dogApiService, 'getDoggoByBread');
    const bySubBreedSpy = spyOn(dogApiService, 'getDoggoBySubBread');
    service.fetchImageByBreed(['spaniel', 'brittany'], 1);  
    expect(byBreedSpy).not.toHaveBeenCalled();
    expect(bySubBreedSpy).toHaveBeenCalled();
  });

  it('#fetchRandomImage should call #api.getRandomImage and return imageInfo', (done) => {
    const mockResponse = 'https://images.dog.ceo/breeds/african/image-code.jpg';
    const mockAsyncResponse = of(mockResponse).pipe(delay(100));
    
    const expectedOutput = {
      imageUrl: mockResponse,
      name: 'african',
      navLink: ['breeds/african/']
    }
    spyOn(dogApiService, 'getRandomImage').and.returnValue(mockAsyncResponse);
    
    service.fetchRandomImage().subscribe( (output) => {
      expect(output).toEqual(expectedOutput);
      done();
    })
  });

  it('#fetchRandomImage should call #api.getRandomImage and return imageInfo w/ subBreed', (done) => {
    const mockResponse = 'https://images.dog.ceo/breeds/african-doggo/image-code.jpg';
    const mockAsyncResponse = of(mockResponse).pipe(delay(100));
    
    const expectedOutput = {
      imageUrl: mockResponse,
      name: 'african - doggo',
      navLink: ['breeds/african/doggo']
    }
    spyOn(dogApiService, 'getRandomImage').and.returnValue(mockAsyncResponse);
    
    service.fetchRandomImage().subscribe( (output) => {
      expect(output).toEqual(expectedOutput);
      done();
    })
  });

  it('#fetchRandomImage should call #api.getRandomImage and return not-found', (done) => {
    const mockResponse = 'https://images.dog.ceo/breeds/'
    const mockAsyncResponse = of(mockResponse).pipe(delay(100));

    const expectedOutput = {
      imageUrl: mockResponse,
      name: '',
      navLink: ['not-found']
    }
    spyOn(dogApiService, 'getRandomImage').and.returnValue(mockAsyncResponse);
    
    service.fetchRandomImage().subscribe( (output) => {
      expect(output).toEqual(expectedOutput);
      done();
    })
  });
});
