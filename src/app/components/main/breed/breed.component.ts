import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';
import { formatBreed } from 'src/app/utils/utils';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  public message = '';
  public imageURLs: string[] = [];
  public selectedBreedDetail: string[] = [];
  public numResults = 25;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private happyDogBusinessService: HappyDogBusinessService,
    public happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
    this.subscribeToActiveRoute();
  }

  subscribeToActiveRoute() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.selectedBreedDetail = this.updatedBreedDetail(params);

      if (!this.selectedBreedDetail.length) {
        this.router.navigate(['/not-found']);
      }
      this.fetchImageByBreed();
    })
  }

  fetchImageByBreed() {
    this.happyDogStateService.isLoading = true;
    this.happyDogBusinessService.fetchImageByBreed(this.selectedBreedDetail[0], this.selectedBreedDetail[1] ?? '', this.numResults)
      .subscribe((urls: string[]) => {
        this.imageURLs = urls;
        this.happyDogStateService.isLoading = false;
        if (this.imageURLs.length > 0) {
          this.message = `Found ${this.imageURLs.length} result(s) for ${formatBreed(this.selectedBreedDetail)}!`
        } else {
          this.message = 'Sorry! No results have been found!'
        }
      });
  }

  updatedBreedDetail(params: ParamMap): string[] {
    const breed = params.get('breed') ?? '';
    const subBreed = params.get('sub') ?? '';
    if(subBreed){
      return [breed, subBreed]
    }
    return [breed];
  }
}
