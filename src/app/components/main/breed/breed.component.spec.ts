import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { BreedComponent } from './breed.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FormatBreedPipe } from 'src/app/pipes/breed-format.pipe';
import { formatBreed } from 'src/app/utils/utils';

describe('BreedComponent', () => {
  let component: BreedComponent;
  let fixture: ComponentFixture<BreedComponent>;
  let happyDogBusinessService: HappyDogBusinessService;
  let formatBreedPipe: FormatBreedPipe;

  formatBreedPipe = {
    transform: ( input:string[] ) => {
      return formatBreed(input);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientModule, FormsModule ],
      declarations: [ BreedComponent, SearchFormComponent, FormatBreedPipe ],
      providers: [
        { provide: FormatBreedPipe, useFactory: () => formatBreedPipe},
        {
          provide: ActivatedRoute, useValue: 
             { paramMap: of(convertToParamMap({"breed": "setter", "sub": "english"}))}
        }
      ]
        
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedComponent);
    component = fixture.componentInstance;
    happyDogBusinessService = TestBed.inject(HappyDogBusinessService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract route parameters to variables', () => {
    expect(component.breedDetails).toEqual(['setter','english']);
  });

  it('should update message some results are obtained', () => {
    spyOn(happyDogBusinessService, 'fetchImageByBreed').and.returnValue(of(['url']));
    component.ngOnInit();
    expect(component.breedDetails).toEqual(['setter', 'english']);
    expect(component.imageURLs).toEqual(['url']);
    expect(component.message).toEqual(`Found 1 result(s) for Setter - English!`)
  });

  it('should update message if no results are obtained', () => {
    spyOn(happyDogBusinessService, 'fetchImageByBreed').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.breedDetails).toEqual(['setter', 'english']);
    expect(component.imageURLs).toEqual([]);
    expect(component.message).toEqual('Sorry! No results have been found!');
  });
});
