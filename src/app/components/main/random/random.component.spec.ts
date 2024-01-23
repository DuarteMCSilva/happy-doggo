import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomComponent } from './random.component';
import { HttpClientModule } from '@angular/common/http';
import { FormatBreedPipe } from 'src/app/pipes/breed-format.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('RandomComponent', () => {
  let component: RandomComponent;
  let fixture: ComponentFixture<RandomComponent>;
  let capitalizeMock: FormatBreedPipe;

  capitalizeMock = {
    transform: () => ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientModule ],
      declarations: [ RandomComponent ],
      providers: [
        { provide: FormatBreedPipe, useFactory: () => capitalizeMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
