import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { auth_env, tmdb_env } from 'src/environments/environment';
import { AuthService } from './auth.service';
export interface MovieInterface {
  name: string;
  id: string;
  rating: number;
  genre?: string[];
  genreId?: number[];
  img?: string;
  description?: string;
  releaseDate?: Date;
  duration?: number;
}


export interface MovieDetailsInterface{
  name: string,
  id: number,
  language: string,
  genres:{id:number,name:string}[],
  backdroppath: string,
  description: string,
  releaseDate: Date;
  duration: number;
  status: string,
  popularity: number,
  posterpath: string,
  rating: number,
  watchrating: string,
  productionCountries: any[], 
  budget?: number
}




@Injectable({
  providedIn: 'root'
})
export class MovieservicesService {
  
  constructor(private http: HttpClient,private authservice: AuthService) {}


  getMovie(id: string){
    const response = this.http.get(`${tmdb_env.base_url}/movie/${id}?api_key=${this.authservice.userObject?.getToken()}&language=en-US&page=1`)
    .pipe(map((response: any) =>{
      let movieDetails : MovieDetailsInterface = {
        name: response?.title,
        id: response?.id,
        language: response?.original_language,
        genres: response?.genres,
        backdroppath: tmdb_env.image_base_url + response?.backdrop_path,
        description: response?.overview,
        releaseDate: new Date(response?.release_date),
        duration: response?.runtime,
        status: response?.status,
        popularity: response?.popularity,
        rating: response?.vote_average,
        watchrating: !response?.adult?"0+":"18+",
        productionCountries: response?.production_countries,
        posterpath: tmdb_env.image_base_url + response?.poster_path,
        budget: response?.budget
      };
      return movieDetails;
    }));
    return response;
  }

  getSimilarmovies(movieId: string){
    const response = this.http.get(`${tmdb_env.base_url}/movie/${movieId}/similar?api_key=${this.authservice.userObject?.getToken()}&language=en-US&page=1`)
    .pipe(map((response: any) =>{
      var movieList: MovieInterface[]=[];
      response?.results.filter((movie: any) => movie?.original_language == 'en' && movie?.poster_path!=null).slice(0,3).map((movie: any) =>{
        let m: MovieInterface = {
          name:movie?.title,
          id:movie?.id,
          rating:movie?.vote_average,
          //genre:['Genre'],
          //genreId: movie?.genre_ids,
          img: tmdb_env.image_base_url + movie?.poster_path,
          description: movie?.overview,
          releaseDate: new Date(movie?.release_date)
        }
        movieList.push(m);
      });
      return(movieList);
    }));
    return response;
  }
  searchmovie(searchtitle: string){
    const response = this.http.get(`${tmdb_env.base_url}/search/movie?api_key=${this.authservice.userObject?.getToken()}&language=en-US&page=1&include_adult=false&query=${searchtitle}`)
    .pipe(map((response: any)=>{
      var movieList: MovieInterface[]=[];
      response?.results.filter((movie: any) => movie?.original_language == 'en' && movie?.poster_path!=null).slice(0,3).map((movie: any) =>{
        let m: MovieInterface = {
          name:movie?.title,
          id:movie?.id,
          rating:movie?.vote_average,
          //genre:['Genre'],
          //genreId: movie?.genre_ids,
          img: tmdb_env.image_base_url + movie?.poster_path,
          description: movie?.overview,
          releaseDate: new Date(movie?.release_date)
        }
        movieList.push(m);
      });
      return(movieList);
    }));
    return response;
  }

  getVideos(movie_id: string){
    const response = this.http.get(`${tmdb_env.base_url}/movie/${movie_id}/videos?api_key=${this.authservice.userObject?.getToken()}&language=en-US`)
    .pipe(map((response: any) =>{
      const youtubeVideo = response?.results.find((item : any) => item?.site == "YouTube");
      if(!!youtubeVideo)
        return `https://www.youtube.com/embed/${youtubeVideo?.key}`;
      else
        throw new Error("No supported video found")
    }));
    return response;
  }
  getGenres(){
    const response = this.http.get(`${tmdb_env.base_url}/genre/movie/list?api_key=${this.authservice.userObject?.getToken()}&language=en-US`)
    .pipe(map((response: any) =>{
      return (response?.genres);  
    }));
    return response;
  }

  getAllMovies(page: number =1){
    const response = this.http.get(`${tmdb_env.base_url}/movie/top_rated?api_key=${this.authservice.userObject?.getToken()}&language=en-US&page=${page}`)
    .pipe(map((response: any) =>{
      var topmovielist: MovieInterface[]=[];
      response?.results.filter((movie: any) => movie?.original_language == 'en').map((movie: any) =>{
        let m: MovieInterface = {
          name:movie?.title,
          id:movie?.id,
          rating:movie?.vote_average,
          genre:['Genre'],
          genreId: movie?.genre_ids,
          img: tmdb_env.image_base_url + movie?.poster_path,
          description: movie?.overview,
          releaseDate: new Date(movie?.release_date)
        }
        topmovielist.push(m);
      });
      return(topmovielist);
    }));

    return response;
  }
  
}


