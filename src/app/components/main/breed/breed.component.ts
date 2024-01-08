import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { capitalizeText } from 'src/app/utils/utils';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  public title = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (params) => {
      const selectedBreed = params.get('breed') ?? '';
      const selectedSubBreed = params.get('sub');

      if(!selectedBreed){
        this.router.navigate(['/not-found']);
      }

      this.title = capitalizeText(selectedBreed);

      if(selectedSubBreed){
        this.title += ' - ' + capitalizeText(selectedSubBreed)
      }
    })
  }
}
