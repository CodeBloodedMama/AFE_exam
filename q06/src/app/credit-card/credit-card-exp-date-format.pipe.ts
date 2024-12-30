import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardExpDateFormat',
})
export class CreditCardExpDateFormatPipe implements PipeTransform {
  transform(expMonth: number, expYear: number): string {
    const month = expMonth.toString().padStart(2, '0'); // Ensure two-digit month
    const year = expYear.toString().slice(-2); // Get the last two digits of the year

    return `${month}/${year}`;
  }
}
