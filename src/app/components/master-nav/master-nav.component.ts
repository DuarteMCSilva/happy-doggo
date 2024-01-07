import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

@Component({
  selector: 'app-master-nav',
  templateUrl: './master-nav.component.html',
  styleUrls: ['./master-nav.component.scss']
})
export class MasterNavComponent implements OnInit {

  public data: any;
  public breeds: string[] = [];
  public subBreedsMap: Map<string, string[]> = new Map<string, string[]>();

  isNavBarVisible: boolean = true;
  isBreedExpanded: boolean = false;

  constructor(private dogBusinessService: HappyDogBusinessService, public happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
    this.dogBusinessService.getAllBreeds();
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
