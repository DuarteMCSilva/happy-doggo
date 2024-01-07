import { Injectable } from '@angular/core';
import { DogApiService } from '../api/dog-api.service';
import { HappyDogStateService } from '../state/happy-dog-state.service';
import { BreedNode } from 'src/app/model/happy-doggo-model';

@Injectable({
  providedIn: 'root'
})
export class HappyDogBusinessService {

  constructor(private dogApiService: DogApiService, private happyDogStateService: HappyDogStateService) {
  }

  public getAllBreeds() {
    this.dogApiService.getAllBreeds().subscribe( (response) => {

      if(response.status !== 'success' || !response.message) {
        console.error("Internal service error!")
        return
      }

      const breeds: BreedNode[] = [];

      Object.entries(response.message).forEach( ([ breed, subBreed]) => {
        const newBreed = { name: breed, subBreeds: subBreed };
        breeds.push(newBreed);
        return breeds
      })

      this.happyDogStateService.breedsTree = breeds;
    });
  }
}
