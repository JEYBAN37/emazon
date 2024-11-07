import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Brand } from "../models/brand-interface";

export class ArticleMarket {
    name!: string;
    description!: string;
    quantity!: number;
    price!: number;
    brand!: Brand;
    articleCategories!: Category[];
}


export class Category {
    id!: number;
    name!: string;
}


@Injectable({
  providedIn: 'root' // Esto permite que el servicio sea inyectado en cualquier parte de la aplicación
})
export class ArticleMarketService {
  private apiUrl = 'http://localhost:8086/'; // Cambia esta URL por la de tu API
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4OCwic3ViIjoiamVzc0BleGFtcGxlLmNvbSIsImlhdCI6MTczMDc3Nzg0MywiZXhwIjoxNzMwODY0MjQzfQ.U2I8ROtdU4lJ0YdmQ0ElL978xGJraCdc825gAVUdQmI'; // Asegúrate de que este token sea válido

  constructor(private http: HttpClient) {}

  get(page: number, size: number, ascending: boolean, byName: string | null): Observable<ArticleMarket[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Incluir el token Bearer
    });

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('ascending', ascending.toString());

    if (byName) {
      params = params.set('byName', byName);
    }

    return this.http.get<ArticleMarket[]>(this.apiUrl + 'secure/articles/', { headers, params });
  }
}
