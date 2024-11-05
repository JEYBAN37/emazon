import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

export class Article implements ObjectStock {
    name!: string;
    description!: string;
    quantity!:number;
    price:number = 0;
    brand!:string;
    articleCategories : number[] = [] 
  }

  export class Brand {
    id !: number;
    name !: string
  }

@Injectable({
    providedIn: 'root'
  })
  export class ArticleService implements ObjectServiceInterface {
    private apiUrl = 'http://localhost:8086/'; // Cambia esta URL por la de tu API
    private token ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4Nywic3ViIjoiamVzQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwNzc3MDI0LCJleHAiOjE3MzA4NjM0MjR9.Yv-FvrZRnPBZRr3kNFKcaJQPojMPBktbVaf48DlbzX8';
    constructor(private http: HttpClient) {}

    create(object: Article): Observable<Article> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
      });
  
      return this.http.post<Article>(this.apiUrl + 'admin/articles/', object, { headers })

  }

    get(page: number, size: number,ascending:true,byName:string): Observable<Article[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}` // Incluir el token Bearer
      });
      // Agregar los parámetros
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('ascending', ascending.toString())
        ;

        
  
      return this.http.get<Article[]>(this.apiUrl + 'secure/articles/', { headers, params });
    }

  }