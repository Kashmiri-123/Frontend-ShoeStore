import { Injectable } from '@angular/core';
import { API } from 'src/BackEndConnection/Api';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(API + "/all-categories");
  }

  getCategoryById(id:string): Observable<any>{
    return this.http.get(API + "/category/" + id);
  }

  updateCategory(id:string, updatedCategory:any): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(updatedCategory);
    return this.http.put(API + "/category-update/" + id, body, {'headers': header})
  }

  addCategory(category:any): Observable<any> {
    let header = {'content-type': 'application/json'};
    let body = JSON.stringify(category);
    return this.http.post(API + "/add-category/", body, {'headers': header})
  }

  removeCategory(id:string): Observable<any> {
    return this.http.delete(API + "/category-remove/" + id);
  }
}
