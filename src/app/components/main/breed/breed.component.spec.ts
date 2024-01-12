import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedComponent } from './breed.component';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizePipe } from 'src/app/utils/capitalize.pipe';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('BreedComponent', () => {
  let component: BreedComponent;
  let fixture: ComponentFixture<BreedComponent>;
  let happyDogBusinessService: HappyDogBusinessService;
  let capitalizeMock: CapitalizePipe;

  capitalizeMock = {
    transform: ( input:string ) => {
      return input[0].toUpperCase() + input.slice(1);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientModule ],
      declarations: [ BreedComponent ],
      providers: [
        { provide: CapitalizePipe, useFactory: () => capitalizeMock},
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
    component.fullBreedName = 'Spaniel';
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

    expect(component.selectedBreed).toEqual('setter');
    expect(component.selectedSubBreed).toEqual('english');
    expect(component.fullBreedName).toEqual('Setter - English');
  });
});
