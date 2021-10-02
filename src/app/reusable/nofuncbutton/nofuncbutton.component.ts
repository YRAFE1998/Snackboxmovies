import { Component, Input, OnInit } from '@angular/core';
import ColorPalette from 'src/theme/colorPalette';

@Component({
  selector: 'app-nofuncbutton',
  templateUrl: './nofuncbutton.component.html',
  styleUrls: ['./nofuncbutton.component.css']
})
export class NofuncbuttonComponent implements OnInit {
  bgColor = ColorPalette.lightSecondary;
  color = ColorPalette.turqoiuseLightSecondary;

  constructor() { }

  ngOnInit(): void {
  }

}
