import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieInterface, MovieservicesService } from 'src/app/services/movieservices.service';
import ColorPalette from 'src/theme/colorPalette';
import 'bootstrap/dist/js/bootstrap.min'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movietable',
  templateUrl: './movietable.component.html',
  styleUrls: ['./movietable.component.css']
})

export class MovietableComponent implements OnInit, OnDestroy {

  headcolor = ColorPalette.mid;

  getmoviesSubscription?: Subscription;
  getgenresSubscription?: Subscription;
  isLoading: boolean = true;
  MovieList?: MovieInterface[];
  genreList?: {id: number, name: string}[];
  errormessage?: string = "";
  page: number = 1;
  constructor(private movieservice: MovieservicesService) {}
  ngOnDestroy(): void {
    this.getmoviesSubscription?.unsubscribe();
    this.getgenresSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getGenreList();
    this.getAllMovies();
  }


  getAllMovies(){
    this.isLoading=true;
    this.getmoviesSubscription?.unsubscribe();
    this.getmoviesSubscription = this.movieservice.getAllMovies(this.page).subscribe(list =>{
      this.MovieList = list;
      this.isLoading = false;
      this.errormessage = "";
    }, err=>{
      this.errormessage = err?.message;
      this.isLoading = false;
    });
  }
  prevpage(){
    if(this.page>1)
      this.page-=1;
      console.log(this.page);
    this.getAllMovies();
    window.scroll(0,0);
  }
  nextpage(){
    this.page +=1;
    this.getAllMovies();
    window.scroll(0,0);
  }
  getGenreList(){
    this.getgenresSubscription = this.movieservice.getGenres().subscribe(list =>{
      this.genreList = list;
    }, err => {
      this.genreList = [];
    })
  }

}
