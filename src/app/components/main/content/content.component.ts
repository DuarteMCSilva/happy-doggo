import { Component, OnInit } from '@angular/core';
import { HappyDogBusinessService } from 'src/app/services/business/happy-dog-business.service';
import { HappyDogStateService } from 'src/app/services/state/happy-dog-state.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public data: any;
  public breeds: string[] = [];
  public subBreedsMap: Map<string, string[]> = new Map<string, string[]>();

  constructor(private dogBusinessService: HappyDogBusinessService, public happyDogStateService: HappyDogStateService) { }

  ngOnInit(): void {
    this.dogBusinessService.getAllBreeds();
  }

}
