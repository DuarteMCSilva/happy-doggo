import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { CapitalizePipe } from 'src/app/utils/capitalize.pipe';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  public title = '';
  public imageURL = '';
  public selectedBreed = '';
  public selectedSubBreed = '';

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private happyDogBusinessService: HappyDogBusinessService, 
    private capitalizePipe: CapitalizePipe) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log("hey")
      this.selectedBreed = params.get('breed') ?? '';
      this.selectedSubBreed = params.get('sub') ?? '';

      if (!this.selectedBreed) {
        this.router.navigate(['/not-found']);
      }

      this.fetchImageByBreed();

      this.title = this.capitalizePipe.transform(this.selectedBreed);

      if (this.selectedSubBreed) {
        this.title += ' - ' + this.capitalizePipe.transform(this.selectedSubBreed)
      }
    })
  }

  fetchImageByBreed() {
    this.happyDogBusinessService.fetchImageByBreed(this.selectedBreed, this.selectedSubBreed).subscribe((url) => {
      this.imageURL = url;
    });
  }
}
