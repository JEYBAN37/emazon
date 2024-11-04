import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

export class Article implements ObjectStock {
    name!: string;
    description!: string;
    quantity!:number;
    price:number = 0;
    brand!:Brand;
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
    private apiUrl = 'http://localhost:8086/secure/articles/'; // Cambia esta URL por la de tu API
  
    constructor(private http: HttpClient) {}

    get(page: number, size: number,ascending:true,byName:string): Observable<Article[]> {

      const token ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiAiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4Niwic3ViIjoianVwdXNzQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwNjYwNjA0LCJleHAiOjE3MzA3NDcwMDR9.3p53ny1vR0HccSuvhFegzG35QzhlUsWaJxHdV2dkR7s';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluir el token Bearer
      });
      // Agregar los parámetros
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('ascending', ascending.toString())
        ;

        
  
      return this.http.get<Article[]>(this.apiUrl, { headers, params });
    }


    create(object: Article): Observable<Article> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
      
          return this.http.post<Article>(this.apiUrl, object, { headers });  
    }

  }