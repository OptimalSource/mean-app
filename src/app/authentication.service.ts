import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userLoginStatus:boolean=false
  currentUser
  constructor(private hc:HttpClient) { }

  userLogin(userCredObj):Observable<any>{
    return this.hc.post('/user/login',userCredObj)
  }

  // adminLogin(adminCredObj):Observable<any>{
  //   return this.hc.post()
  // } 

  logoutUser(){
    localStorage.removeItem("token");
    this.userLoginStatus=false
  }
}
