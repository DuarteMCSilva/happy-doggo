import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
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

  private breedButtonHoverTimeout?: NodeJS.Timeout;

  isNavBarCollapsed: boolean = false;
  isBreedExpanded: boolean = false;

  constructor(private router: Router, private dogBusinessService: HappyDogBusinessService, public happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
    this.isNavBarCollapsed = this.happyDogStateService.isNavbarCollapsed;
    this.dogBusinessService.getAllBreeds();
  }

  onClickCollapseButton(): void {
    this.isNavBarCollapsed = !this.isNavBarCollapsed;
    this.happyDogStateService.isNavbarCollapsed = this.isNavBarCollapsed;
  }

  onExpandCategory(): void {
    this.isBreedExpanded = !this.isBreedExpanded;
  }

  onOptionClick(path: string): void {
    this.router.navigate([path]);
  }

  onBreedHover(trigger: MatMenuTrigger, expandable: boolean): void {
    if (expandable) {
      setTimeout( () => trigger.openMenu(), 100);
    }
  }

  onBreedMouseLeave(trigger: MatMenuTrigger, expandable: boolean): void {
    if (expandable) {
      this.breedButtonHoverTimeout = setTimeout( () => trigger.closeMenu(),150);
    }
  }

  onSubBreedMouseEnter(): void {
    clearTimeout(this.breedButtonHoverTimeout);
  }

  onSubBreedMouseLeave(trigger: MatMenuTrigger): void {
    setTimeout( () => trigger.closeMenu(), 250);
  }
}
