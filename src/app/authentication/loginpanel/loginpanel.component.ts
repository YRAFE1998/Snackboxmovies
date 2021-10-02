import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginpanel',
  templateUrl: './loginpanel.component.html',
  styleUrls: ['./loginpanel.component.css']
})
export class LoginpanelComponent implements OnInit {

  generalerror: string = "";
  constructor(private authservice: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm){
    if(form.valid){
    this.authservice.login(form.value.username, form.value.password)
    .then((user: any) =>{
      this.generalerror="";
      this.route.navigate(['']);
    })
    .catch((err: Error) =>{
      this.generalerror=err.message;
    })
    }
  }

}
