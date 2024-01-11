import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-frame',
  templateUrl: './image-frame.component.html',
  styleUrls: ['./image-frame.component.scss']
})
export class ImageFrameComponent implements OnInit {
  private readonly DEFAULT_IMG_SIZE = 200;
  @Input() imageURL: string = '';
  @Input() imageSize: number = this.DEFAULT_IMG_SIZE;
  private SCALE_FACTOR = 1.15;

  public borderSize: string = `${this.DEFAULT_IMG_SIZE}px` ;

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
