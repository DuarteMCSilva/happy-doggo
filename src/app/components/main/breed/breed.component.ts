import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';

import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';
import { formatBreed } from 'src/app/utils/utils';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit, OnDestroy {

  public message = '';
  public imageURLs: string[] = [];
  public breedDetails: string[] = [];
  public numResults = 25;

  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private happyDogBusinessService: HappyDogBusinessService,
    public happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
    this.subscription.add(this.subscribeToActiveRoute());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToActiveRoute(): Subscription {
    return this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          this.breedDetails = this.getBreedDetails(params);
          return this.breedDetails;
        }),
        switchMap((breedDetails) => {
          return this.happyDogBusinessService.fetchImageByBreed(breedDetails, this.numResults);
        })
      )
      .subscribe((urls: string[]) => {
        this.imageURLs = urls;
        this.happyDogStateService.isLoading = false;
        this.message = this.buildFeedbackMessage(urls.length);
      });
  }

  private buildFeedbackMessage(numResults: number): string {
    if (numResults > 0) {
      return `Found ${numResults} result(s) for ${formatBreed(this.breedDetails)}!`;
    } else {
      return 'Sorry! No results have been found!';
    }
  }

  private getBreedDetails(params: ParamMap): string[] {
    const breed = params.get('breed') ?? '';
    const subBreed = params.get('sub') ?? '';
    if (subBreed) {
      return [breed, subBreed];
    }
    return [breed];
  }
}
