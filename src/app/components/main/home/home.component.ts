import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public imageURLs: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.importImagesFromAssets();
  }

  importImagesFromAssets(){
    this.imageURLs.push('assets/images/my-friends/milu.jpeg');
    this.imageURLs.push('assets/images/my-friends/suki.jpeg');
  }

}
