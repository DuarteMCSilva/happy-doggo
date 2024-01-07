import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNavComponent } from './master-nav.component';

describe('MasterNavComponent', () => {
  let component: MasterNavComponent;
  let fixture: ComponentFixture<MasterNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
