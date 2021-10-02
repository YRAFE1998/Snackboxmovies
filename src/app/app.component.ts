import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'snackboxmovies';
  isLoggedIn: boolean = false;
  activeurl?: string='';
  authSubscription?: Subscription;
  
  constructor(private authservice: AuthService, private route: Router){}
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }


  ngOnInit(){
    this.authservice.user?.subscribe(user => {
      if(!!user)
        this.isLoggedIn = true;
      else
        this.isLoggedIn = false;
    });
    this.authservice.autoLogin()
    .then(res =>{
    })
    .catch(err => 
      this.route.navigate(['auth'])
      );

  }
  
}
