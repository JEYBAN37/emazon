import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

export class Article implements ObjectStock {
    name!: string;
    description!: string;
    quantity:number=0;
    price:number = 0;
    articleCategories : number[] = [] 
  }

@Injectable({
    providedIn: 'root'
  })
  export class ArticleService implements ObjectServiceInterface {
    private apiUrl = 'https://api.example.com/categories'; // Cambia esta URL por la de tu API
  
    constructor(private http: HttpClient) {}

    create(object: Article): Observable<Article> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
      
          return this.http.post<Article>(this.apiUrl, object, { headers });  
    }

  }