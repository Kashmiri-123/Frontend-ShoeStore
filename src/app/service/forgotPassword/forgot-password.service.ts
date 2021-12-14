import { Injectable, OnInit } from '@angular/core';
import { API } from 'src/BackEndConnection/Api';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService{

  constructor(private http: HttpClient) { }

  forgotPasswordEmail(email: any): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(email);
    return this.http.post(API + "/forgot/password", body, {headers: header});
  }

  updatePassword(password: any, id: string): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(password);
    return this.http.put(API + "/reset/password/" + id, body, {headers: header});
  }
}
