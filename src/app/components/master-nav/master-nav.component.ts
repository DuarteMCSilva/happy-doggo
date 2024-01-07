import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

@Component({
  selector: 'app-master-nav',
  templateUrl: './master-nav.component.html',
  styleUrls: ['./master-nav.component.scss']
})
export class MasterNavComponent implements OnInit {

  isNavBarVisible: boolean = true;
  isBreedExpanded: boolean = false;

  constructor(public happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
  }

  onClickButton() {
    this.isNavBarVisible = !this.isNavBarVisible;
    console.log(this.isNavBarVisible);
  }

  onExpandCategory() {
    this.isBreedExpanded = !this.isBreedExpanded;
  }

  onAnyBreedSearch(path:string){
    /* router.navigate(['breeds']); */
    console.log("not there yet !: " + path)
  }

  onBreedHover(trigger: MatMenuTrigger, expandable:boolean){
    if(expandable){
      trigger.openMenu();
    }
  }
}
