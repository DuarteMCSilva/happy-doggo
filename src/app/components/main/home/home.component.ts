import { Component, OnInit } from '@angular/core';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public imageURLs: string[] = [];

  constructor(private happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
    this.importImagesFromAssets();
  }

  importImagesFromAssets(){
    this.imageURLs.push('assets/images/my-friends/milu.jpeg');
    this.imageURLs.push('assets/images/my-friends/suki.jpeg');
    this.happyDogStateService.isLoading = false;
  }

}
