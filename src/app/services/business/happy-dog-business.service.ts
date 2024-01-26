import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { DogApiService } from 'src/app/services/api/dog-api.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';
import { BreedNode, RandomImageInfo } from 'src/app/model/happy-doggo-model';

@Injectable({
  providedIn: 'root'
})
export class HappyDogBusinessService { // TODO: improve error handling

  constructor(
    private dogApiService: DogApiService,
    private happyDogStateService: HappyDogStateService
    ) { }

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

  public fetchImageByBreed([breed, subBreed]: string[], numResults: number): Observable<string[]> {
    if (subBreed) {
      return this.dogApiService.getDoggoBySubBread(breed, subBreed, numResults);
    } else {
      return this.dogApiService.getDoggoByBread(breed, numResults);
    }
  }

  public fetchRandomImage(): Observable<RandomImageInfo> {
    return this.dogApiService.getRandomImage()
      .pipe(map( (imgUrl) => {
        const randomImageResponse =  this.computeBreedInfoFromRandomResponse(imgUrl); 
        this.happyDogStateService.isLoading = false;
        return randomImageResponse;
      }
    ))
  }

  private computeBreedInfoFromRandomResponse(response: string): RandomImageInfo {
    const responseUrlSliced = response.split("/");
    const indexOfBreed = 1 + responseUrlSliced.findIndex((ele) => ele === 'breeds');
    // The breed comes after the resource /breeds, usually in the index 4.
    const breedInfo = responseUrlSliced[indexOfBreed].split("-");
    return { 
      imageUrl: response,
      name: breedInfo.join(" - "),
      navLink: [ this.buildBreedNavUrl(breedInfo) ]
    };
  }

  private buildBreedNavUrl(breedInfo: string[]): string {
    let [breed, subBreed] = breedInfo;
    if(!breed){
      return `not-found`;
    }
    return `breeds/${breed}/${subBreed ?? ''}`;
  }
}
