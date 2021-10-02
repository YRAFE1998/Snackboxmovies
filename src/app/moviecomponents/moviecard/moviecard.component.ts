import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieInterface, MovieservicesService } from '../../services/movieservices.service';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {

  @Input() movie?: MovieInterface;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoMovie(){
    this.router.navigate(["/movie", this.movie?.id]);
  }

}
