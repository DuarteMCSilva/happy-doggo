import { Injectable } from '@angular/core';
import { BreedNode } from 'src/app/model/happy-doggo-model';

interface DoggoAppState {
  isLoading: boolean,
  breedsTree: BreedNode[]
}

@Injectable({
  providedIn: 'root'
})
export class HappyDogStateService {
  
  private state: DoggoAppState = {
    isLoading: false,
    breedsTree: []
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
}
