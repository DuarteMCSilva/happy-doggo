import { Component, OnInit } from '@angular/core';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  public imageURL = '';

  constructor(private happyDogBusinessService: HappyDogBusinessService) { }

  ngOnInit(): void {
    this.fetchRandomImage();
  }

  fetchRandomImage() {
    this.happyDogBusinessService.fetchRandomImage().subscribe( (url) => {
      this.imageURL = url;
    });
  }

}
