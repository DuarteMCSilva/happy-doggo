import { Injectable } from '@angular/core';
import { DogApiService } from '../api/dog-api.service';
import { HappyDogStateService } from '../state/happy-dog-state.service';
import { BreedNode } from 'src/app/model/happy-doggo-model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HappyDogBusinessService {

  constructor(private dogApiService: DogApiService, private happyDogStateService: HappyDogStateService) {
  }

  public getAllBreeds() {
    this.dogApiService.getAllBreeds().subscribe((response) => {

      if (response.status !== 'success' || !response.message) {
        console.error("Internal service error!")
        return
      }

      const breeds: BreedNode[] = [];

      Object.entries(response.message).forEach(([breed, subBreed]) => {
        const newBreed = { name: breed, subBreeds: subBreed };
        breeds.push(newBreed);
        return breeds
      })

      this.happyDogStateService.breedsTree = breeds;
    });
  }

  public fetchRandomImage(): Observable<string> {
    return this.dogApiService.getRandomImage()
  }

  public fetchImageByBreed(breed: string, subBreed: string, numResults: number) {
    if (subBreed) {
      return this.dogApiService.getDoggoBySubBread(breed, subBreed, numResults);
    } else {
      return this.dogApiService.getDoggoByBread(breed, numResults);
    }
  }
}
