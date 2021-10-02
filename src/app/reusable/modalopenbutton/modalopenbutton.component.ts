import { Component, Input, OnInit } from '@angular/core';
import ColorPalette from 'src/theme/colorPalette';

@Component({
  selector: 'app-modalopenbutton',
  templateUrl: './modalopenbutton.component.html',
  styleUrls: ['./modalopenbutton.component.css']
})
export class ModalopenbuttonComponent implements OnInit {

  @Input() inputid?:string;
  bgColor = ColorPalette.lightSecondary;
  color = ColorPalette.turqoiuseLightSecondary;
  width ='initial';
  @Input('width') inputwidth ?: number;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.width = !!this.inputwidth? `${this.inputwidth}%`:'initial';
  }  
}
