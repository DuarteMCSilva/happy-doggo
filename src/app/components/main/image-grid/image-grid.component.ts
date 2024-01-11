import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {

  @Input() imageURLs: string[] = [];
  @Input() imageSize: number = 200;

  constructor() { }

  ngOnInit(): void {
  }

}
