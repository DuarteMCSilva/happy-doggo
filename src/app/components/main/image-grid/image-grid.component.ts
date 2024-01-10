import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {
  @Input() imageURL: string = '';
  @Input() imageSize: number = 200;
  private SCALE_FACTOR = 1.15;

  public borderSize: string = '200px';

  constructor() { }

  ngOnInit(): void {
    this.borderSize = this.computeBorderSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['imageSize']) {
      this.borderSize = this.computeBorderSize();
    }
  }

  private computeBorderSize(): string{
    const size = this.SCALE_FACTOR * this.imageSize;
    return `${size}px` 
  }
}
