
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreedNode } from 'src/app/model/happy-doggo-model';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  public breedsTree$: Observable<BreedNode[]>;
  public selectedBreedNode?: BreedNode;
  public selectedSubBreed?: string;
  @ViewChild('form', { static: false }) searchForm?: NgForm;

  @Output() images: string[] = [];

  constructor(
    public happyDogStateService: HappyDogStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
    this.breedsTree$ = new Observable<BreedNode[]>();
  }

  ngOnInit(): void {
    this.breedsTree$ = this.happyDogStateService.breedsTree$;
    this.subscribeToActivatedRoute();
  }

  subscribeToActivatedRoute(){
    this.activatedRoute.paramMap.subscribe( (params) => {
      this.searchForm?.onReset();
    })
  }

  onSubmit(form: NgForm): void {
    const params = form.form.value;

    const breed = params.breed.name;
    const subBreed = params.subBreed?.toLowerCase();
    this.happyDogStateService.isLoading = true;
    if(subBreed) {
      const url = `breeds/${breed}/${subBreed}`;
      this.router.navigate([url]);
    } else{
      this.router.navigate([`breeds/${breed}`]);
    }
  }

  onFeelingLucky() {
    this.router.navigate(['random']);
  }
}
