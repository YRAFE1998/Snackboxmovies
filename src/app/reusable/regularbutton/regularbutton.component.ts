import { Component, Input, OnInit,AfterViewInit, Output, EventEmitter } from '@angular/core';
import ColorPalette from 'src/theme/colorPalette';

@Component({
  selector: 'app-regularbutton',
  templateUrl: './regularbutton.component.html',
  styleUrls: ['./regularbutton.component.css']
})
export class RegularbuttonComponent implements OnInit,AfterViewInit {

  @Output() onButtonClick = new EventEmitter<any>();
  bgColor = ColorPalette.lightSecondary;
  color = ColorPalette.turqoiuseLightSecondary;
  width ='initial';
  
  @Input('width') inputwidth ?: number;
  @Input() id? : string;
  @Input() disabled?: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.width = !!this.inputwidth? `${this.inputwidth}%`:'initial';
  }
  onClick(id: string,event: any){
    this.onButtonClick.emit({'id': id, 'event':event});
  }


}
