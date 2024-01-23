import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

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
    breed = breedInfo[0] ?? '';
    subBreed = breedInfo[1] ?? '';
    this.buttonLinkElements.push(`breeds/${breed}/${subBreed}`);
    return breedInfo.join(" - ");
  }

  onClickMoreResults() {
    this.router.navigate(this.buttonLinkElements);
  }
  }
