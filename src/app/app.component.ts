import { Component } from '@angular/core';
import { HappyDogStateService } from './services/state/happy-dog-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'happy-doggo';
  constructor(public happyDogStateService: HappyDogStateService) {
  }
}
