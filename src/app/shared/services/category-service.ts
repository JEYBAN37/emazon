import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

export class Category implements ObjectStock {
  name!: string;
  description!: string;
  }

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService implements ObjectServiceInterface {
    private apiUrl = 'http://localhost:8086/secure/category/'; // Cambia esta URL por la de tu API
  
    constructor(private http: HttpClient) {}

    create(object: Category): Observable<Category> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
      
          return this.http.post<Category>(this.apiUrl, object, { headers });  
    }
    
    get(page: number, size: number,ascending:true): Observable<Category[]> {

      const token ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4Niwic3ViIjoianVwdXNzQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwNjI1NzQ1LCJleHAiOjE3MzA3MTIxNDV9.E74P3Vw0WLCbf5fznfLaxMxblPk4kkTah9v_dmqGzyI';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluir el token Bearer
      });
      // Agregar los parámetros
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('ascending', ascending.toString());
  
      return this.http.get<Category[]>(this.apiUrl, { headers, params });
    }

  }