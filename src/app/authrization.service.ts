import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthrizationService implements HttpInterceptor{


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //intercopting login

    //get token is existed 
    let token = localStorage.getItem("token");

    //if token is existed 
    if (token) {
      //create clone of req object and add token to header property of req
      let clonedReq = req.clone({
        headers: req.headers.set("Authorization","Bearer "+token)
      })
      return next.handle(clonedReq)
    } else {
      //send req without bearer token
      return next.handle(req)
    }
  }
}
