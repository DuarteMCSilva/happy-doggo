import { Observable, catchError, of} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RandomImageInfo } from 'src/app/model/happy-doggo-model';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  public imageInfo$: Observable<RandomImageInfo>;
  public isLoading$: Observable<boolean>;
  
  constructor(
    public happyDogStateService: HappyDogStateService,
    private happyDogBusinessService: HappyDogBusinessService,
    private router: Router
    ) { 
    }

  ngOnInit(): void {
    this.isLoading$ = this.happyDogStateService.isLoading$;
    this.imageInfo$ = this.happyDogBusinessService.fetchRandomImage()
      .pipe(
        catchError( (err) => {
          console.error(err);
          this.router.navigate(['not-found']);
          return of();
        }),
      )
  }

  onClickMoreResults(navLink:string[]) {
    this.router.navigate(navLink);
  }
}
