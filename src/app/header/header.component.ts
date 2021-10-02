import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import ColorPalette from 'src/theme/colorPalette';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MovieInterface, MovieservicesService } from '../services/movieservices.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input('loggedIn') isLoggedIn?: boolean;
  @ViewChild('searchBar') searchbar?: ElementRef; 
  searchvalue?: string;
  backgroundcolor = ColorPalette.light; 
  searchmoviesub?: Subscription;
  activeroutesub?: Subscription;
  SearchMovieList?: MovieInterface[];
  isGettingresults?: boolean = false;
  constructor(private router: Router,private authservice: AuthService,private movieservice: MovieservicesService) {}
  isFocused: boolean = false;

  


  ngOnInit(): void {

  }

  gotoauth(){
    this.router.navigate(['auth'])
  }
  clearsearchbar(){
    this.searchvalue= "";
    this.SearchMovieList = [];

  }
  onInputfocus = (event: any) => {
    this.isFocused = true;
  }
  onInputblur = (event: any) => {
    this.isFocused = false;
  }


  searchmovies(value: any){
    this.searchmoviesub?.unsubscribe();
    if(!!value?.target?.value){
      this.isGettingresults=true;
      this.searchmoviesub = this.movieservice.searchmovie(value?.target?.value || "").subscribe(response =>{
        this.SearchMovieList = response;
        this.isGettingresults=false;
      });
    }
    else{
      this.clearsearchbar();
      this.SearchMovieList = [];
    }
  }
  logout(){
    this.authservice.logout()
    .then(res => {
      this.gotoauth();
    })
    .catch((err: Error) =>{
    })
  }

  gotmovie(id: any){
    this.router.navigate(["/movie", id]);
  }
  ngOnDestroy(): void {
    this.searchmoviesub?.unsubscribe();
  }

}
