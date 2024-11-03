import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

export class Brand implements ObjectStock {
  name!: string;
  description!: string;
  }

@Injectable({
    providedIn: 'root'
  })
  export class BrandService implements ObjectServiceInterface {
    private apiUrl = 'https://api.example.com/categories'; // Cambia esta URL por la de tu API
  
    constructor(private http: HttpClient) {}

    create(object: Brand): Observable<Brand> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
      
          return this.http.post<Brand>(this.apiUrl, object, { headers });  
    }

  }