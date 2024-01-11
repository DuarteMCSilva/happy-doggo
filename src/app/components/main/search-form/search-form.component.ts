
import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  @Output() images: string[] = [];

  constructor(
    public happyDogStateService: HappyDogStateService,
    private router: Router
    ) { 
    this.breedsTree$ = new Observable<BreedNode[]>();
  }

  ngOnInit(): void {
    this.breedsTree$ = this.happyDogStateService.breedsTree$;
  }

  onSubmit(form: NgForm) {
    const params = form.form.value;

    const breed = params.breed.name;
    const subBreed = params.subBreed;

    if(subBreed) {
      const url = `breeds/${breed}/${subBreed}` 
      this.router.navigate([url]);
    }

    this.router.navigate([`breeds/${breed}`]);
  }
}
