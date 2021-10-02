import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(ids: number, genreList: {id: number, name: string}[]): string[] {
    const list = genreList?.filter((genre: {id: number, name: string}) => ids == genre.id);
    return list.map((item) => item.name);
  }

}
