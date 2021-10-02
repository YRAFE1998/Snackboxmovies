import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { auth_env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user =  new Subject<User>();
  userObject?: User;
  constructor() {}
  
  login(username: string, password: string){
    let error="";
    if(auth_env.find(item => item.username == username)){
      error="";
      if(auth_env.find(item => item.password == password))
        error=""
      else{
        error="Password is incorrect";
      }
    }
    else{
      error="Username is not correct";
    }

    return new Promise((resolve, reject) =>{
      if(!!!error){
        const userdetails = auth_env.find(item => item.username == username);
        if(!!userdetails){
          const user = new User(
            userdetails?.username,
            userdetails?.token
            );
            this.userObject = user;
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userData", JSON.stringify(user))
            this.user?.next(user);
            resolve(user);
        }
        else
          reject(new Error("Something went wrong"));
      }
      else
        reject(new Error(error));
        
    })
  }

  autoLogin(){
    let userData;
    let username: string;
    let token: string;
    let error: boolean = true;
    if(localStorage?.getItem("isLoggedIn") == "true" && !!JSON.parse(localStorage?.getItem("userData") || "{}")){
      userData = JSON.parse(localStorage.getItem("userData") || "{}");
    }

    if(!!userData){
      username = userData?.username;
      token = userData?.token;
      error = !!!auth_env.find(item => item.token == token && item.username == username);
    }

    return new Promise((resolve, reject) =>{
      if(!error){

        const userdetails = auth_env.find(item => item.username == JSON.parse(localStorage.getItem("userData") || "{}").username);
        if(!!userdetails?.username){
          const user = new User(
            userdetails?.username,
            userdetails?.token
            );
            this.userObject = user;
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userData", JSON.stringify(user));
            this.user?.next(user);
            resolve(user);
        }
        else{          
          localStorage.setItem("isLoggedIn", "false");
          localStorage.setItem("userData", "");
          reject(new Error("Unauthorized"));

        }
      }
      else{
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("userData", "");
        reject(new Error("Unauthorized"));
      }
    })
  }

  logout(){
    this.userObject = undefined;
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData");
    this.user.next(undefined);
    let error=false;
    return new Promise((resolve, reject) =>{
      if(!!!error){
        resolve("Logged out");
      }
      else
          reject(new Error("Something went wrong"));       
    })
  }
}

class User {
  private username: string;
  private token: string;
  
  constructor(username: string, token: string){
      this.username = username;
      this.token = token;
  }

  getUsername = () => {
      return this.username;
  }
  
  getToken = () => {
      return this.token;
  }

  setUsername = (username: string) => {
      this.username = username;
  }
  setToken = (token: string) => {
      this.token = token;
  }

}

export default User;