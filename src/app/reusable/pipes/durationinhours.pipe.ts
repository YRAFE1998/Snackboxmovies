import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationinhours'
})
export class DurationinhoursPipe implements PipeTransform {

  transform(minutes: number): string {
    return (`${Math.floor(minutes/60)} h ${minutes%60} m`);
  }

}
