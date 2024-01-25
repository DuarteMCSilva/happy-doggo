import { TestBed } from '@angular/core/testing';

import { HappyDogStateService } from './happy-dog-state.service';

describe('HappyDogStateService', () => {
  let service: HappyDogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappyDogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #get and #set isLoading', () => {
    expect(service.isLoading).toEqual(false);
    service.isLoading = true;
    expect(service.isLoading).toEqual(true);
  });

  it('should #get and #set isNavBarCollapsed', () => {
    expect(service.isNavbarCollapsed).toEqual(false);
    service.isNavbarCollapsed = true;
    expect(service.isNavbarCollapsed).toEqual(true);
  });

  it('should #get and #set breedsTree', () => {
    const breedsTreeNodeMock = [{ name: 'spaniel', subBreeds: ['brittany', 'cocker'] }]
    expect(service.breedsTree).toEqual([]);
    service.breedsTree = breedsTreeNodeMock;
    expect(service.breedsTree).toEqual(breedsTreeNodeMock);
  });
});
