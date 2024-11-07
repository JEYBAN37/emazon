import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFactoryService {

  constructor(private http:HttpClient) { }

  createGet<T>(endpoint : string , params : any = {}): Observable<T>{
     let httpParams = new HttpParams();

     for (const key in params){
      if (params[key] != undefined && params[key] != null){
        httpParams = httpParams.set(key,params[key])
      }
     }

     return this.http.get<T>(endpoint,{params:httpParams})
  }

  createPost<T>(endpoint: string, body: any, params: any = {}): Observable<T> {
    let httpParams = new HttpParams();
    
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.post<T>(endpoint, body, {
      params: httpParams
    });
  }

  createPut<T>(endpoint: string, body: any, params: any = {}): Observable<T> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.put<T>(endpoint, body, {
      params: httpParams
    });
  }
}

