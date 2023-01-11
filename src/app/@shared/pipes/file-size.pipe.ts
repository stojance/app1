import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(value: number, args?: any): string {
    if (value >= 1024 * 1024 * 1024 * 1024) {
      return (value / (1024 * 1024 * 1024 * 1024)).toFixed(2) + ' TB';
    } else if (value >= 1024 * 1024 * 1024) {
      return (value / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (value >= 1024 * 1024) {
      return (value / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (value >= 1024) {
      return (value / 1024).toFixed(2) + ' KB';
    } else {
      return value + ' B';
    }
  }
}
