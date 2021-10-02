import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productionCountryStringify'
})
export class ProductionCountryStringifyPipe implements PipeTransform {

  transform(countries : {iso_3166_1: string}[] | undefined): string {
    var ret = '';
    if(!!countries)
    countries.forEach((element,index) => {
      ret = ret + element.iso_3166_1 + (index == countries.length -1 ?'':', ');
    });

    return ret;
  }

}
