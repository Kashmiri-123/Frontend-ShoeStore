import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/BackEndConnection/Api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private authService: AuthService, 
    private http:HttpClient
  ) { }

  
  addAddress = (address: any): Observable<any> => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(address);
    console.log("BODY", body);
    return this.http.post(`${API}/add-address`, body, {'headers': header})
  }

  updateAddress = (address:any): Observable<any> => {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(address);
    return this.http.put(`${API}/address-update/${address?.id}`, body, {'headers': header}) 
  }

  deleteAddress = (address: string): Observable<any> => {
    return this.http.delete(`${API}/remove-address/${address}`);
  }

  getAllAddressByUser = (): Observable<any> => {
    let id = this.authService.isAuthenticated()?.user?.id;
    return this.http.get(`${API}/all-address/${id}`)
  }
}
