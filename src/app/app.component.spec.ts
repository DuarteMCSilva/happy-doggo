import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DogApiService } from './services/api/dog-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HappyDogBusinessService } from './services/business/happy-dog-business.service';

describe('AppComponent', () => {
  let dogApiService: DogApiService;
  let happyDogBusinessService: HappyDogBusinessService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    dogApiService = TestBed.inject(DogApiService);
    happyDogBusinessService = TestBed.inject(HappyDogBusinessService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'happy-doggo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('happy-doggo');
  });

  it('should call getAllBreeds when initializing', () => {
    const businessSpy = spyOn(happyDogBusinessService, 'getAllBreeds');
    TestBed.createComponent(AppComponent);
    expect(businessSpy).toHaveBeenCalled();
  });
});
