import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  createUser(userDetailsObj):Observable<any>{
    return this.hc.post('/user/create-user',userDetailsObj)
  }

  getUserInfo():Observable<any>{
    return this.hc.get(`/user/get-protectedData`)
  }
}
