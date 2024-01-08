import { Injectable } from '@angular/core';
import { DogApiService, GetResponseImages } from '../api/dog-api.service';
import { HappyDogStateService } from '../state/happy-dog-state.service';
import { BreedNode } from 'src/app/model/happy-doggo-model';
import { Observable, map } from 'rxjs';

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
      .pipe(map((response) => this.extractMessage(response)))
  }

  public fetchImageByBreed(breed: string, subBreed: string) {
    if (subBreed) {
      return this.dogApiService.getDoggoBySubBread(breed, subBreed).pipe(map((response) => this.extractMessage(response)));
    } else {
      return this.dogApiService.getDoggoByBread(breed).pipe(map((response) => this.extractMessage(response)));
    }

  }

  private extractMessage(response: GetResponseImages) {
    if (response.status !== 'success' || !response.message) {
      console.error("Internal service error!")
      return '';
    }

    const imageURL = response.message
    return imageURL;
  }
}
