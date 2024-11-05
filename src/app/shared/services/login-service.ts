import { Injectable } from "@angular/core";
import { ObjectServiceInterface, ObjectStock } from "./stock-service-interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";



export class Username implements ObjectStock {
    email!: string;
    password!: string;
}

@Injectable({providedIn: 'root'})

export class LoginService implements ObjectServiceInterface {
    private apiUrl = 'http://localhost:8086/'; // Cambia esta URL por la de tu API
    constructor(private http: HttpClient) {}
    
    get(page: number, size: number, ascending: boolean, byBrand?: string, byArticle?: string, byName?: string): Observable<ObjectStock[]> {
        throw new Error("Method not implemented.");
    }

    create(object: Username): Observable<Username> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json'
      });

      return this.http.post<Username>(this.apiUrl + 'public/login', object, { headers })

  }

  }