import { Pipe, PipeTransform } from '@angular/core';
import { formatBreed } from '../utils/utils';

@Pipe({
  name: 'formatBreed'
})
export class FormatBreedPipe implements PipeTransform {
  transform(breedDetail: string[]): string {
    return formatBreed(breedDetail);
  }
}
