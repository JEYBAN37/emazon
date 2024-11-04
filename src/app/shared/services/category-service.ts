import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";

export class Category implements ObjectStock {
  name!: string;
  description!: string;
  }

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService implements ObjectServiceInterface {
    token ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiAiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4Niwic3ViIjoianVwdXNzQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwNjYwNjA0LCJleHAiOjE3MzA3NDcwMDR9.3p53ny1vR0HccSuvhFegzG35QzhlUsWaJxHdV2dkR7s';
    
    private apiUrl = 'http://localhost:8086/'; // Cambia esta URL por la de tu API
  
    constructor(private http: HttpClient) {}

    create(object: Category): Observable<Category> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
      });
  
      return this.http.post<Category>(this.apiUrl + 'admin/category/', object, { headers })

  }
  
    get(page: number, size: number,ascending:true): Observable<Category[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}` // Incluir el token Bearer
      });
      // Agregar los parámetros
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('ascending', ascending.toString());
  
      return this.http.get<Category[]>(this.apiUrl + 'secure/category/', { headers, params });
    }

  }