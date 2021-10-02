import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MovieInterface } from '../../services/movieservices.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

  @Output() onSearchchange = new EventEmitter<string>();
  @ViewChild('searchbar') searchbar?: ElementRef;
  isFocused: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  clearsearchbar(){
    console.log(this.searchbar?.nativeElement?.value);
    //if(!!this.searchbar?.nativeElement?.value)
    //  this.searchbar?.nativeElement?.value="";
  }
  onInputfocus = (event: any) => {
    this.isFocused = true;
  }
  onInputblur = (event: any) => {
    this.isFocused = false;
  }
  onSearchChange(event: any){
    this.onSearchchange.emit(event.target.value);
  }

}
