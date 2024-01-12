import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';
import { CapitalizePipe } from 'src/app/utils/capitalize.pipe';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  public message = '';
  public imageURLs: string[] = [];
  public selectedBreed = '';
  public selectedSubBreed = '';
  public numResults = 25;
  public fullBreedName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private happyDogBusinessService: HappyDogBusinessService,
    public happyDogStateService: HappyDogStateService,
    private capitalizePipe: CapitalizePipe) { }

  ngOnInit(): void {
    this.subscribeToActiveRoute();
  }

  subscribeToActiveRoute() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.selectedBreed = params.get('breed') ?? '';
      this.selectedSubBreed = params.get('sub') ?? '';

      if (!this.selectedBreed) {
        this.router.navigate(['/not-found']);
      }

      this.fetchImageByBreed();

      this.fullBreedName = this.capitalizePipe.transform(this.selectedBreed);

      if (this.selectedSubBreed) {
        this.fullBreedName += ' - ' + this.capitalizePipe.transform(this.selectedSubBreed)
      }
    })
  }

  fetchImageByBreed() {
    this.happyDogStateService.isLoading = true;
    this.happyDogBusinessService.fetchImageByBreed(this.selectedBreed, this.selectedSubBreed, this.numResults)
      .subscribe((urls: string[]) => {
        this.imageURLs = urls;
        this.happyDogStateService.isLoading = false;
        if (this.imageURLs.length > 0) {
          this.message = `Found ${this.imageURLs.length} result(s) for ${this.fullBreedName}!`
        } else {
          this.message = 'Sorry! No results have been found!'
        }
      });
  }
}
