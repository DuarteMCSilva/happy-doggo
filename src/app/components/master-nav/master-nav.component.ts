import { Component, OnInit } from '@angular/core';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-master-nav',
  templateUrl: './master-nav.component.html',
  styleUrls: ['./master-nav.component.scss']
})
export class MasterNavComponent implements OnInit {

  isNavBarVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton() {
    this.isNavBarVisible = !this.isNavBarVisible;
    console.log(this.isNavBarVisible);
  }
}
