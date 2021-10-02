import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
@Injectable({providedIn:"root"})
export class AuthLoginGuard implements CanActivate{
    constructor(private authService: AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return (!this.authService.userObject)
    }

    

    /*canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>{
        return this.authService.user.pipe(map(user =>{
            console.log(user);
            return !!user;
        }));
    }*/
}