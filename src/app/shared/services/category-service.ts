import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

export class Category implements ObjectStock {
  name!: string;
  description!: string;
  }

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService implements ObjectServiceInterface {
    private apiUrl = 'https://api.example.com/categories'; // Cambia esta URL por la de tu API
  
    constructor(private http: HttpClient) {}

    create(object: Category): Observable<Category> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
      
          return this.http.post<Category>(this.apiUrl, object, { headers });  
    }

  }