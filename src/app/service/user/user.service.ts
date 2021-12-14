import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/BackEndConnection/Api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersById(id:string): Observable<any>{
    return this.http.get(API + "/user/" + id);
  }

  updateUser(id:string, updatedUser:any): Observable<any>{
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(updatedUser);
    return this.http.put(API + "/user-update/" + id, body, {'headers': header});
  }
}
