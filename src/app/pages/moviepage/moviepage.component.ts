import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  movieid?: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieid=this.route.snapshot.params['id']
  }


}
