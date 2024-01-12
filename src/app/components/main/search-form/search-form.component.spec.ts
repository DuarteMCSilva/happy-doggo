import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let router: Router;
  let happyDogStateService: HappyDogStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), FormsModule],
      declarations: [SearchFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    happyDogStateService = TestBed.inject(HappyDogStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to breed route if no sub-breed selected', () => {
    const testForm = <NgForm>{
      form: {
        value: {
          breed: {name: 'spaniel', subBreeds: ['brittany', 'cocker']}
        }
      }
    };
    const routerSpy = spyOn(router, 'navigate');

    component.onSubmit(testForm);
    expect(routerSpy).toHaveBeenCalledWith(['breeds/spaniel']);
    expect(component).toBeTruthy();
  });

  it('should navigate to breed/subbreed route', () => {
    const testForm = <NgForm>{
      form: {
        value: {
          breed: {name: 'spaniel', subBreeds: ['brittany', 'cocker']},
          subBreed: 'cocker'
        }
      }
    };
    const routerSpy = spyOn(router, 'navigate');

    component.onSubmit(testForm);
    expect(routerSpy).toHaveBeenCalledWith(['breeds/spaniel/cocker']);
    expect(happyDogStateService.isLoading).toEqual(true);
  });
});
