import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { Injectable } from "@angular/core";

export class User implements ObjectStock {
    name!: string;
    lastName!: string;
    dni!:number;
    telephone:number = 0;
    brand!:string;
    dateAge !: Date;
    email!: string;
    password!: string;
  }

  export class Brand {
    id !: number;
    name !: string
  }

@Injectable({
    providedIn: 'root'
  })
  
  export class UserAuxService implements ObjectServiceInterface {
    private apiUrl = 'http://localhost:8088/'; // Cambia esta URL por la de tu API
    private token ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo5MCwic3ViIjoiamVzc3NAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzA4NDQ1MjUsImV4cCI6MTczMDkzMDkyNX0.dBhgQl_7y3iHNnlbESTAw_S4WSObUn_ocRa-UqIiQW8';
    constructor(private http: HttpClient) {}
    
  get(page: number, size: number, ascending: boolean, byBrand?: string, byArticle?: string, byName?: string): Observable<ObjectStock[]> {
    throw new Error("Method not implemented.");
  }

    create(object: User): Observable<User> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
      });
  
      return this.http.post<User>(this.apiUrl + 'admin/register/aux_bodega', object, { headers })

  }

  }