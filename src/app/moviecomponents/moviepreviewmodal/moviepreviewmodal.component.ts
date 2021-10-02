import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieInterface } from 'src/app/services/movieservices.service';
import ColorPalette from 'src/theme/colorPalette';

@Component({
  selector: 'app-moviepreviewmodal',
  templateUrl: './moviepreviewmodal.component.html',
  styleUrls: ['./moviepreviewmodal.component.css']
})
export class MoviepreviewmodalComponent implements OnInit {

  @Input() movieId?: string; 
  @Input() movie?: MovieInterface;
  @Input() genreList?: {id: number, name: string}[]; 
  inputid?: string;
  displayproperty: string = 'none';
  show: boolean = false;
  backgroundcolor=ColorPalette.backgroundColor;
  //durationinhours?: any;
  releaseYear?: number;
  constructor(private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  GotoMovie(){
    this.router.navigate(['movie',this.movie?.id],{relativeTo:this.route});
  }
}
