import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  readonly breedsTree$: Observable<BreedNode[]>;
  readonly isLoading$: Observable<boolean>;

  readonly breedsTreeSubject: BehaviorSubject<BreedNode[]>;
  readonly isLoadingSubject: BehaviorSubject<boolean>;
  
  private state: DoggoAppState = {
    breedsTree: [],
    isLoading: false,
    navbarCollapsed: false
  }

  constructor() { 
    this.breedsTreeSubject = new BehaviorSubject<BreedNode[]>([]);
    this.breedsTree$ = this.breedsTreeSubject.asObservable();

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  } 

  get breedsTree(): BreedNode[] {
    return this.state.breedsTree;
  }

  set breedsTree(breeds: BreedNode[]) {
    this.state.breedsTree = breeds;
    this.breedsTreeSubject.next(this.state.breedsTree);
  }

  get isLoading(): boolean {
    return this.state.isLoading
  }
  set isLoading(isLoading: boolean){
    this.state.isLoading = isLoading;
    console.log(isLoading);
    this.isLoadingSubject.next(this.state.isLoading);
  }

  get isNavbarCollapsed(): boolean{
    return this.state.navbarCollapsed;
  }

  set isNavbarCollapsed(bool: boolean) {
    this.state.navbarCollapsed = bool;
  }
}
