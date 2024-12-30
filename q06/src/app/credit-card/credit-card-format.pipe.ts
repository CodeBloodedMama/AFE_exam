import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat',
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: number): string {
    // Remove any non-digit characters (e.g., spaces or hyphens)
    const cleanedValue = String(value).replace(/\D/g, '');

    // Use regex to split the cleaned value into groups of 4 digits
    const formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ');

    return formattedValue.trim(); // Trim to remove any leading/trailing spaces
  }
}
