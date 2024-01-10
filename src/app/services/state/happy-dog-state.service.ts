import { Injectable } from '@angular/core';
import { BreedNode } from 'src/app/model/happy-doggo-model';

interface DoggoAppState {
  breedsTree: BreedNode[]
  isLoading: boolean,
  navbarCollapsed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class HappyDogStateService {
  
  private state: DoggoAppState = {
    breedsTree: [],
    isLoading: false,
    navbarCollapsed: false
  }

  constructor() { }

  get breedsTree(): BreedNode[] {
    return this.state.breedsTree;
  }

  set breedsTree(breeds: BreedNode[]) {
    this.state.breedsTree = breeds;
  }

  get isLoading(): boolean {
    return this.state.isLoading
  }
  set isLoading(isLoading: boolean){
    this.state.isLoading = isLoading;
  }

  get isNavbarCollapsed(): boolean{
    return this.state.navbarCollapsed;
  }

  set isNavbarCollapsed(bool: boolean) {
    this.state.navbarCollapsed = bool;
  }
}
