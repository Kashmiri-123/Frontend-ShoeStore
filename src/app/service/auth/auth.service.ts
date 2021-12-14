import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from 'src/BackEndConnection/Api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  logInService = (user:any): Observable<any> => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(user);
    return this.http.post(API + "/signin", body, {'headers': header})
  }

  registerService = (user:any): Observable<any> => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(user);
    return this.http.post(API + "/signup", body, {'headers': header})
  }

  setUserOnLocalStorage= (user:any) => {
    const currentUser = localStorage.getItem("user");
    if(!currentUser){
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("role", user?.user?.role)
    }
    else{
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("role", user?.user?.role)
    }
  }

  isAuthenticated= () : any => {
      const user = localStorage.getItem("user")
      if(user){
        return JSON.parse(user) 
      }
      return false;
  }

  getRole = ():any => {
    if(this.isAuthenticated()){
        return localStorage.getItem("role")
    }
    else{
      return null;
    }
  }

  handleLogOut = () => {
    if(localStorage.getItem("user")){
      localStorage.removeItem("user")
    }
  }

  getAllUsers(): Observable<any>{
    return this.http.get(API + "/all-users");
  }
}
