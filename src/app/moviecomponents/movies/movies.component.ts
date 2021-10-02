import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetailsInterface, MovieInterface, MovieservicesService } from '../../services/movieservices.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  @Input('movieid') movieId: string = '';
  @ViewChild('iframe') iframe?: ElementRef;
  movie?: MovieDetailsInterface;
  similarmovies?: MovieInterface[];
  videosrc?: string;

  videoAvailable: boolean = true;
  durationinhours?: any;
  releaseYear?: number;
  isGettingMovieDetails?: boolean = true;
  isGettingMovievideo?: boolean = true;
  isGettingSimilarMovies?: boolean = true;

  errormessage?: string = "";
  getMoviesubscription?: Subscription;
  getVideosSubscription?: Subscription;
  getSimilarmoviesSubscription?: Subscription;

  constructor(private movieservice: MovieservicesService, private renderer :Renderer2, private activeroute: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.getMoviesubscription?.unsubscribe();
    this.getVideosSubscription?.unsubscribe();
    this.getSimilarmoviesSubscription?.unsubscribe();
  }

  loadMovie(){
    this.getMoviesubscription?.unsubscribe();
    this.getVideosSubscription?.unsubscribe();
    this.getSimilarmoviesSubscription?.unsubscribe();

    this.isGettingMovieDetails=true;
    this.isGettingMovievideo=true;
    this.isGettingSimilarMovies=true;


    this.getMoviesubscription = this.movieservice.getMovie(this.movieId)
    .subscribe((response) =>{
      this.movie = response;
      this.isGettingMovieDetails = false;
      this.errormessage = "";
      window.scroll(0,0);
    }, (err: Error) => {
      this.errormessage = err.message;
      this.isGettingMovieDetails = false;
    });

    this.getVideosSubscription = this.movieservice.getVideos(this.movieId)
    .subscribe((response) =>{
      console.log(this.iframe?.nativeElement);
      this.videoAvailable = true;
      this.isGettingMovievideo=false;
      this.videosrc=response;
      setTimeout(() => {
        this.renderer.setAttribute(this.iframe?.nativeElement,'src', response);
      }, 10); 
    }, (err: Error) =>{
      console.log(err.message);
      this.videoAvailable=false;
      this.isGettingMovievideo=false;
      this.videosrc=""
    });

    this.getSimilarmoviesSubscription = this.movieservice.getSimilarmovies(this.movieId)
    .subscribe((response) =>{
      this.similarmovies = response;
      this.isGettingSimilarMovies = false;
    }, (err: Error) =>{
      this.isGettingSimilarMovies=false;
    });
  }

  ngOnInit(): void {
    this.movieId = this.activeroute.snapshot.params['id'];
    this.activeroute.params.subscribe((params: Params)=>{
      this.movieId = params['id'];
      this.loadMovie();
    });
    this.loadMovie();
    window.scroll(0,0);

  }

  getUrlforstyle(url: string | undefined){
    return 'url("' + url + '")';
  }
}
