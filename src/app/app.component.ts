import { Component } from '@angular/core';
import { HappyDogStateService } from './services/state/happy-dog-state.service';
import { HappyDogBusinessService } from './services/business/happy-dog-business.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'happy-doggo';
  constructor(public happyDogStateService: HappyDogStateService, private dogBusinessService: HappyDogBusinessService, ) {
    this.dogBusinessService.getAllBreeds();
  }

  onRouteChange(){
    this.happyDogStateService.isLoading = true;
  }
}
