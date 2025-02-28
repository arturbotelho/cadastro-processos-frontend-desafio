import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';


@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | number, format: string = 'shortDate'): string | null {
    // Check if the value is valid
    if (!value) return null;

    // Use Angular's built-in formatDate function to format the date
    return formatDate(value, format, 'en-US');
  }

}
