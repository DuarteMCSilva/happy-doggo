import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedComponent } from './breed.component';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormatBreedPipe } from 'src/app/pipes/breed-format.pipe';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('BreedComponent', () => {
  let component: BreedComponent;
  let fixture: ComponentFixture<BreedComponent>;
  let happyDogBusinessService: HappyDogBusinessService;
  let formatBreed: FormatBreedPipe;

  formatBreed = {
    transform: ( input:string[] ) => {
      return formatBreed.transform(input);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientModule ],
      declarations: [ BreedComponent ],
      providers: [
        { provide: FormatBreedPipe, useFactory: () => formatBreed},
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

  it('should update message some results are obtained', () => {
    component.selectedBreedDetail = ['Spaniel'];
    spyOn(happyDogBusinessService, 'fetchImageByBreed').and.returnValue(of(['url']));
    component.fetchImageByBreed();
    expect(component.message).toEqual(`Found 1 result(s) for Spaniel!`);
  });

  it('should update message if no results are obtained', () => {
    spyOn(happyDogBusinessService, 'fetchImageByBreed').and.returnValue(of([]));
    component.fetchImageByBreed();
    expect(component.message).toEqual('Sorry! No results have been found!');
  });

  it('should extract route parameters to variables', () => {
    spyOn(happyDogBusinessService, 'fetchImageByBreed').and.returnValue(of(['url']));

    expect(component.selectedBreedDetail).toEqual(['setter','english']);
  });
});
