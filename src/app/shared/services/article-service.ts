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
    private token ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4Niwic3ViIjoianVwdXNzQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwNjI1NzQ1LCJleHAiOjE3MzA3MTIxNDV9.E74P3Vw0WLCbf5fznfLaxMxblPk4kkTah9v_dmqGzyI';
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