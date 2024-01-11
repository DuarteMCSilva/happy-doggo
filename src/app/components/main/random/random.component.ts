import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';
import { CapitalizePipe } from 'src/app/utils/capitalize.pipe';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  public imageURL = '';
  public completeBreedName = '';
  public buttonLinkElements: string[] = [];

  constructor(
    private happyDogBusinessService: HappyDogBusinessService,
    public happyDogStateService: HappyDogStateService,
    private capitalizePipe: CapitalizePipe, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchRandomImage();
  }

  fetchRandomImage() {
    this.happyDogBusinessService.fetchRandomImage().subscribe( (url) => {
      this.imageURL = url;
      this.completeBreedName = this.getBreedNameFromResponse(this.imageURL);
      this.happyDogStateService.isLoading = false;
    });
  }
  
  getBreedNameFromResponse(response: string) {
    this.buttonLinkElements = [];
    let breed: string;
    let subBreed;
    const responseUrlSliced = response.split("/");
    const indexOfBreed = 1 + responseUrlSliced.findIndex( (ele) => ele === 'breeds'); 
    // The breed comes after the resource /breeds, usually in the index 4.
    const breedInfo = responseUrlSliced[indexOfBreed].split("-");

    breed = this.capitalizePipe.transform(breedInfo[0]) ?? '';
    this.buttonLinkElements.push("breeds/",breedInfo[0]);

    if(breedInfo.length === 2) {
      subBreed = this.capitalizePipe.transform(breedInfo[1]);
      this.buttonLinkElements.push(breedInfo[1]);
      return `${breed} - ${subBreed}`;
    }
    return breed; 
  }

  onClickMoreResults() {
    this.router.navigate(this.buttonLinkElements);
  }
}
